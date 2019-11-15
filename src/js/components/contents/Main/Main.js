import React, { Component } from 'react';
import Header from '../../common/partials/Header';
import RepoSearchContent from '../../common/repoSearch/RepoSearchContent';

class Main extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="container-fix-top d-flex justify-content-center">
					<div className="col-12 col-lg-10 col-xl-10 p-4">
						<RepoSearchContent />
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
