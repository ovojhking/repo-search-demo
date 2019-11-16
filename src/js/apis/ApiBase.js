import axios from 'axios';

const ApiBase = class ApiBase {
	static defaultGet(url) {
		return axios.get(url).then((res) => res)
			.catch((err) => Promise.reject(err));
	}

	constructor() {
		this.domainName = '';
	}
};

export default ApiBase;
