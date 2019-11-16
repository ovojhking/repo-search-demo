import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { isScrollToBottom } from 'Libs/scroll';

class InfiniteScroll extends Component {
	constructor() {
		super();
		this.lengthOfaddList = 10;
		this.state = {
			resourceList: [],
			renderList: [],
			isWait: false,
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this));
	}

	componentDidUpdate(prevProps) {
		this.onPropsChange(prevProps);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	onPropsChange(prevProps) {
		const { resetFlag, resourceList } = this.props;
		const { resourceList: stateResourceList } = this.state;
		if (resetFlag) {
			this.reset();
		} else if (prevProps.resourceList.length === 0 && resourceList.length > 0) {
			this.setState({ resourceList: [...stateResourceList, ...resourceList] }, () => {
				this.pushRenderList();
			});
		} else if (!_.isEqual(resourceList, prevProps.resourceList)) {
			this.setState({ resourceList: [...stateResourceList, ...resourceList] });
		}
	}

	setDelay(time, callBack) {
		this.setState({ isWait: true });
		setTimeout(
			() => {
				this.setState({ isWait: false });
				callBack();
			},
			time,
		);
	}

	setLoader() {
		const { isWait } = this.state;
		const { loader } = this.props;
		if (isWait) {
			return loader();
		}
		return '';
	}

	setRenderList() {
		const { resourceList } = this.state;
		const { updateResourceList, renderItem } = this.props;

		if (resourceList.length <= this.lengthOfaddList * 2) {
			updateResourceList();
		}

		const renderList = [];
		let counter = 0;
		while (counter < this.lengthOfaddList && resourceList.length > 0) {
			counter += 1;
			const firstItem = resourceList.shift();
			renderList.push(
				renderItem(firstItem),
			);
		}

		this.setState({ resourceList });
		return renderList;
	}

	reset() {
		const { setResetFlag } = this.props;
		this.setState({
			resourceList: [],
			renderList: [],
			isWait: false,
		});

		setResetFlag();
	}

	handleScroll() {
		const { isWait } = this.state;
		if (isScrollToBottom() && !isWait) {
			const { resourceList } = this.props;
			if (resourceList.length !== 0) {
				const { loadingDelay } = this.props;
				const delayTime = loadingDelay || 0;
				this.setDelay(delayTime, this.pushRenderList.bind(this));
			}
		}
	}

	pushRenderList() {
		const { renderList } = this.state;
		renderList.push(
			this.setRenderList(),
		);
		this.setState({ renderList });
	}

	render() {
		const { renderList } = this.state;
		return (
			<div>
				<div>
					{ renderList }
				</div>

				{ this.setLoader() }
			</div>
		);
	}
}

InfiniteScroll.defaultProps = {
	resetFlag: false,
	loader: '',
	setResetFlag: ()=>{},
	loadingDelay: 100
};

InfiniteScroll.propTypes = {
	resourceList: PropTypes.instanceOf(Array).isRequired,
	renderItem: PropTypes.func.isRequired,
	resetFlag: PropTypes.bool,
	loader: PropTypes.instanceOf(Object),
	updateResourceList: PropTypes.func.isRequired,
	setResetFlag: PropTypes.func,
	loadingDelay: PropTypes.number,
};

export default InfiniteScroll;
