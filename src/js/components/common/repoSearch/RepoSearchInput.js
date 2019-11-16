import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import searchTextAction from 'Store/searchText/searchTextAction';
import ValidatorHoc from 'Components/common/validator/ValidatorHoc';
import ImmediateSubmitSearchInput from 'Components/common/searchInput/ImmediateSubmitSearchInput';
import specialCharacters from 'Configs/validatorRules';
import { scrollToTop } from 'Libs/scroll';

const InputValidator = ValidatorHoc(ImmediateSubmitSearchInput, [specialCharacters]);

class RepoSearchInput extends Component {
	constructor() {
		super();
		this.getSearchText = this.getSearchText.bind(this);
	}

	getSearchText(searchText) {
		scrollToTop();
		const { searchTextAction: action } = this.props;
		action.setRepo(searchText);
	}

	render() {
		return (
			<div className="bg-primary-dark repo-search-input">
				<InputValidator getSearchText={this.getSearchText} />
			</div>
		);
	}
}

RepoSearchInput.propTypes = {
	searchTextAction: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => {
	const { searchTexts } = state;
	return {
		stores: {
			searchTextRepo: searchTexts.repo,
		},
	};
};

const mapDispatchToProps = (dispatch) => ({
	searchTextAction: bindActionCreators(searchTextAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoSearchInput);
