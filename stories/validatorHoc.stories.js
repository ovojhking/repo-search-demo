import '../src/styles/sass/app.scss';

import React, {Component} from 'react';
import ValidatorHoc from 'Components/common/validator/ValidatorHoc';
import ImmediateSubmitSearchInput from 'Components/common/searchInput/ImmediateSubmitSearchInput';
import specialCharacters from 'Configs/validatorRules';

export default {
  title: 'validator hoc',
};

const InputValidator = ValidatorHoc(ImmediateSubmitSearchInput, [specialCharacters]);

class ValidatorHocContent extends Component {
	constructor() {
		super();
		this.getSearchText = this.getSearchText.bind(this);
    }

    getSearchText(searchText) {
        console.log('input是: ', searchText);
	}
    
	render() {
		return (
			<div className="bg-white m-4">
                <div className="bg-primary-dark">
				    <InputValidator getSearchText={this.getSearchText} />
                </div>
			</div>
		);
	}
}

export const validatorHoc = () => (
	<div>
		<div className="bg-white p-4">
			<p>說明：</p>
			<p>ValidatorHoc可自由新增驗證規則，或是更換searchInput，只需在這行調整即可搞定。</p>
			<p>const InputValidator = ValidatorHoc(ImmediateSubmitSearchInput, [specialCharacters]);</p>
            <br />
            <p>當前條件：</p>
            <p>當輸入值包含特殊符號會跳出警告。（可開啟控制台查看input log）</p>
		</div>
		<ValidatorHocContent />
	</div>
  );

validatorHoc.story = {
  name: '基本用法',
};
