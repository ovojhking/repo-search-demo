import React from 'react';
import RepoSearchInput from 'Components/common/repoSearch/RepoSearchInput';
import Logo from 'Assets/images/logo.png';

const Header = () => (
	<div className="header d-flex justify-content-center align-items-center">
		<div className="col-12 col-xl-10 h-100 d-flex justify-content-center align-items-center">
			<div className="d-none d-sm-block col-sm-2 col-lg-1 h-70">
				<img className="logo h-100" src={Logo} alt="logo" />
			</div>
			<div className="col-8 col-sm-8 col-lg-7">
				<RepoSearchInput />
			</div>
			<div className="col-4 col-sm-2 col-lg-4 d-flex justify-content-between align-items-center">
				<a className="col-6 text-white d-flex align-items-center no-underline" href="https://github.com/ovojhking/repo-search-demo">
					<i className="fa-lg fab fa-github" />
					<span className="ml-2 d-none d-lg-block">程式碼</span>
				</a>

				<a className="col-6 text-white d-flex align-items-center no-underline" href="https://www.cakeresume.com/s--7hIWbrdfMy9nVV0UQ_I9cA--/jimmy-eab4dd">
					<i className="fa-lg fas fa-id-card" />
					<span className="ml-2 d-none d-lg-block">履歷</span>
				</a>
			</div>
		</div>
	</div>
);

export default Header;
