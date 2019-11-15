import React, { Component } from 'react';
import _ from 'lodash';
import { isScrollToBottom } from '../../../libs/scroll';

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

	componentDidUpdate(prevProps, prevState) {
		const { resetFlag, resourceList } = this.props;
		if (resetFlag) {
			this.reset();
		} else if (prevProps.resourceList.length === 0 && resourceList.length > 0) {
			const stateResourceList = this.state.resourceList;
			this.setState({ resourceList: [...stateResourceList, ...resourceList] }, () => {
				this.pushRenderList();
			});
		} else if (!_.isEqual(resourceList, prevProps.resourceList)) {
			const stateResourceList = this.state.resourceList;
			this.setState({ resourceList: [...stateResourceList, ...resourceList] });
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
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
		if (isScrollToBottom() && !this.state.isWait) {
			const { resourceList } = this.props;
			if (resourceList.length !== 0) {
				const delayTime = this.props.loadingDelay ? this.props.loadingDelay : 0;
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

export default InfiniteScroll;
