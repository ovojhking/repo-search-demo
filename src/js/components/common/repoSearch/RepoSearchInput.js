import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import searchTextAction from '../../../store/searchText/searchTextAction';

import ValidatorHoc from '../validator/ValidatorHoc';
import ImmediateSubmitSearchInput from '../searchInput/ImmediateSubmitSearchInput';
import specialCharacters from '../../../configs/validatorRules';

import { scrollToTop } from '../../../libs/scroll';

const InputValidator = ValidatorHoc(ImmediateSubmitSearchInput, [specialCharacters]);

class RepoSearchInput extends Component {
	constructor() {
		super();
		this.getSearchText = this.getSearchText.bind(this);
	}

	getSearchText(searchText) {
		scrollToTop();
		const { searchTextAction } = this.props;
		searchTextAction.setRepo(searchText);
	}

	render() {
		return (
			<div className="bg-primary-dark repo-search-input">
				<InputValidator getSearchText={this.getSearchText} />
			</div>
		);
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(RepoSearchInput);
