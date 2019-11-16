import React, { Component } from 'react';

function ValidatorHoc(WrappedComponent, validatorRuleList) {
	return class extends React.Component {
		static validate(inputValue) {
			if (inputValue === '') {
				return true;
			}
			return validatorRuleList.some(
				(rule) => inputValue.match(rule),
			);
		}

		constructor(props) {
			super(props);
			this.state = {
				isValidated: true,
			};

			this.hijackGetSearchText = this.hijackGetSearchText.bind(this);
		}

		hijackGetSearchText(inputValue) {
			const { getSearchText } = this.props;
			const isValidated = this.constructor.validate(inputValue);
			if (isValidated) {
				getSearchText(inputValue);
			}
			this.setState({ isValidated });
		}

		renderErrorMsg() {
			const { isValidated } = this.state;
			if (!isValidated) {
				return (
					<div className="position-absolute mt-sm-1 text-warning">不可使用特殊字元</div>
				);
			}
			return '';
		}

		render() {
			return (
				<div className="position-relative">
					<WrappedComponent {...this.props} getSearchText={this.hijackGetSearchText} />
					{this.renderErrorMsg()}
				</div>
			);
		}
	};
}


export default ValidatorHoc;
