export const SET_REPO = 'SET_REPO';

export function setRepo(searchText) {
	return (dispatch) => dispatch({
		type: SET_REPO,
		searchText,
	});
}

export default {
	setRepo,
};
