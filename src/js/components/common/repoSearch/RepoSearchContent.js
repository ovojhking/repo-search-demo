import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import searchTextAction from 'Store/searchText/searchTextAction';
import ApiGithub from 'Apis/ApiGithub';
import DateFormat from 'Libs/DateFormat';
import InfiniteScroll from 'Components/common/infiniteScroll/InfiniteScroll';
import Loading from 'Components/common//loading/Loading';

class RepoSearchContent extends Component {
	static loader() {
		return (
			<div className="d-flex justify-content-center p-2">
				<Loading />
			</div>
		);
	}

	static formatDate(date) {
		const dateFormat = new DateFormat();
		dateFormat.init(date);
		return dateFormat.getBritishFormat();
	}

	constructor() {
		super();
		this.state = {
			isWait: false,
			resetFlag: false,
			page: 1,
			resourceList: [],
		};

		this.onSearchTextChange = this.onSearchTextChange.bind(this);
		this.updateResourceList = this.updateResourceList.bind(this);
		this.setResetFlag = this.setResetFlag.bind(this);
		this.infiniteScrollItem = this.infiniteScrollItem.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { stores } = this.props;
		const { searchTextRepo } = stores;
		const preSearchTextRepo = prevProps.stores.searchTextRepo;

		if (searchTextRepo !== preSearchTextRepo) {
			this.onSearchTextChange(searchTextRepo);
		}
	}

	onSearchTextChange() {
		const { stores } = this.props;
		const { isWait } = this.state;
		const { searchTextRepo } = stores;
		this.resetInfiniteScrollList();
		if (searchTextRepo !== '' && !isWait) {
			this.setState({ isWait: true }, () => {
				this.fetchDataFromGitHub();
			});
		}
	}

	setResetFlag() {
		this.setState({ resetFlag: false });
	}

	resetInfiniteScrollList() {
		this.setState({
			resetFlag: true,
			page: 1,
			resourceList: [],
		});
	}

	updateResourceList() {
		this.fetchDataNextPage();
	}

	fetchDataNextPage() {
		let { page } = this.state;
		page += 1;
		this.setState({ page }, () => {
			this.fetchDataFromGitHub();
		});
	}

	fetchDataFromGitHub() {
		const { stores } = this.props;
		const { searchTextRepo } = stores;
		const isWait = false;
		setTimeout(() => {
			const { stores: setTimeoutStore } = this.props;
			if (searchTextRepo !== setTimeoutStore.searchTextRepo) {
				this.fetchDataFromGitHub();
			} else if (searchTextRepo !== '') {
				const { page } = this.state;
				const apiGithub = new ApiGithub();
				apiGithub.getRepoSearch(searchTextRepo, page).then((res) => {
					const resourceList = res.data.items;
					const { stores: getApiStore } = this.props;
					if (searchTextRepo !== getApiStore.searchTextRepo) {
						this.fetchDataFromGitHub();
					} else {
						this.setState({ resourceList, isWait });
					}
				}).catch((err) => {
					console.log('err:  ', err);
					alert('請稍後再嘗試');
					this.setState({ page: page - 1, isWait });
				});
			} else {
				this.resetInfiniteScrollList();
				this.setState({ isWait: false });
			}
		}, 300);
	}

	infiniteScrollItem(item) {
		return (
			<div
				key={item.id}
				className="d-flex flex-wrap py-4 border-top border-light"
			>
				<div className="col-12 col-lg-7 col-xl-8 pr-3">
					<h3 className="overflow-one-line-hidden">
						{item.full_name}
					</h3>
					<p className="overflow-two-line-hidden text-gray-700 mb-1">
						{item.description}
					</p>
					<div className="d-flex flex-wrap text-gray-600 mb-3">
						<p className="mr-3 mb-0 mt-2">
							{item.license ? item.license.name : null}
						</p>
						<p className="mr-3 mb-0 mt-2">
							{this.constructor.formatDate(item.updated_at)}
						</p>
					</div>
				</div>

				<div className="col-12 col-lg-5 col-xl-4 pt-2 pr-3">
					<div className="d-flex justify-content-between">
						<div className="col-6">
							<span>
								<i className="fas fa-circle mr-sm-2" />
								<span>{item.language}</span>
							</span>
						</div>
						<div className="col-6 ">
							<span>
								<i className="fas fa-star mr-sm-2" />
								<span>{item.stargazers_count}</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderLoader() {
		const { isWait } = this.state;
		if (isWait) {
			return this.constructor.loader();
		}
		return '';
	}

	render() {
		const { resetFlag, resourceList } = this.state;
		return (
			<div className="bg-white">
				{ this.renderLoader() }
				<InfiniteScroll
					resetFlag={resetFlag}
					setResetFlag={this.setResetFlag}
					loader={this.constructor.loader}
					loadingDelay={2000}
					renderItem={this.infiniteScrollItem}
					resourceList={resourceList}
					updateResourceList={this.updateResourceList}
				/>
			</div>
		);
	}
}

RepoSearchContent.propTypes = {
	stores: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => {
	const { searchTexts } = state;
	return {
		stores: {
			searchTextRepo: searchTexts.repo,
		},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchTextAction: bindActionCreators(searchTextAction, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoSearchContent);
