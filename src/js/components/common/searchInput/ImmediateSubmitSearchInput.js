import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImmediateSubmitSearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: props.defaultValue,
		};
		this.onSearchTextChange = this.onSearchTextChange.bind(this);
	}

	onSearchTextChange(event) {
		const { getSearchText } = this.props;
		const searchText = event.target.value;
		this.setState({ searchText });
		getSearchText(searchText);
	}

	render() {
		const { searchText } = this.state;
		return (
			<div className="position-relative">
				<i className="position-absolute search-icon fas fa-search" />
				<input className="search-input border border-primary-dark rounded" type="text" value={searchText} placeholder="請輸入文字" onChange={this.onSearchTextChange} />
			</div>
		);
	}
}

ImmediateSubmitSearchInput.defaultProps = {
	defaultValue: '',
};

ImmediateSubmitSearchInput.propTypes = {
	defaultValue: PropTypes.string,
	getSearchText: PropTypes.func.isRequired,
};

export default ImmediateSubmitSearchInput;
