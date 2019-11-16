import '../src/styles/sass/app.scss';

import React, {Component} from 'react';
import fakeRepo from '../data/fakeRepo';
import InfiniteScroll from '../src/js/components/common/infiniteScroll/InfiniteScroll';
import Loading from '../src/js/components/common//loading/Loading';

export default {
  title: 'infinite scroll',
};

class InfiniteScrollContent extends Component {
	static loader() {
		return (
			<div className="d-flex justify-content-center p-2">
				<Loading />
			</div>
		);
	}

	constructor() {
		super();
		this.state = {
			resourceList: [],
		};
		this.updateResourceList = this.updateResourceList.bind(this);
	}

	componentDidMount(){
		this.fetchDataFromGitHub();
	}

	fetchDataFromGitHub() {
		this.setState({ resourceList:  fakeRepo.items});
	}

	infiniteScrollItem(item) {
		return (
			<div
				key={item.id}
				className="d-flex flex-wrap py-4 border-top border-light"
			>
				<div>
					<h3 className="overflow-one-line-hidden">
						{item.full_name}
					</h3>
					<p className="overflow-two-line-hidden text-gray-700 mb-1">
						{item.description}
					</p>
				</div>
			</div>
		);
	}

	updateResourceList() {
		this.setState({resourceList:[]});
	}

	render() {
		const { resourceList } = this.state;
		return (
			<div className="bg-white m-4">
				<div className="p-4">
					<InfiniteScroll
						loader={this.constructor.loader}
						loadingDelay={2000}
						renderItem={this.infiniteScrollItem}
						resourceList={resourceList}
						updateResourceList={this.updateResourceList}
					/>
				</div>
			</div>
		);
	}
}

export const infiniteScroll = () => (
	<div>
		<div className="bg-white p-4">
			<p>說明：</p>
			<p>若資料取得完畢，就不會繼續loading。</p>
			<p>如果有需要繼續取得資料，就在updateResourceList裡設定</p>
		</div>
		<InfiniteScrollContent />
	</div>
  );

infiniteScroll.story = {
  name: '基本用法',
};
