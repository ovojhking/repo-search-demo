import axios from 'axios';

const ApiBase = class ApiBase {
	constructor() {
		this.domainName = '';
	}

	defaultGet(url) {
		return axios.get(url).then((res) => res)
			.catch((err) => {
				return Promise.reject(err);
			});
	}
};

export default ApiBase;
