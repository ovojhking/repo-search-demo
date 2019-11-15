import React, { Component } from 'react';
import RepoSearchInput from '../repoSearch/RepoSearchInput';
import Logo from '../../../../assets/images/logo.png';

class Header extends Component {
	render() {
		return (
			<div className="header d-flex justify-content-center align-items-center">
				<div className="col-12 col-xl-10 h-100 d-flex justify-content-center align-items-center">
					<div className="d-none d-sm-block col-sm-2 col-lg-1 h-70">
						<img className="logo h-100" src={Logo} alt="logo" />
					</div>
					<div className="col-8 col-sm-8 col-lg-9">
						<RepoSearchInput />
					</div>

					<a className="col-4 col-sm-2 col-lg-2 text-white" href="https://www.cakeresume.com/s--7hIWbrdfMy9nVV0UQ_I9cA--/jimmy-eab4dd">
						<i className="fa-lg fas fa-id-card" />
						<span className="ml-2">履歷</span>
					</a>
				</div>
			</div>
		);
	}
}

export default Header;
