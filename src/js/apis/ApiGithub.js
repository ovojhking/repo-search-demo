import ApiBase from './ApiBase';

const ApiGithub = class ApiGithub extends ApiBase {
	constructor() {
		super();
		this.domainName = 'https://api.github.com';
	}

	getRepoSearch(q = '', page = 0) {
		const url = `${this.domainName}/search/repositories?q=${q}&page=${page}`;
		return this.defaultGet(url);
	}
};

export default ApiGithub;
