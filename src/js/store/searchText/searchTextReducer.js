import {
	SET_REPO,
} from 'Store/searchText/searchTextAction';

export default function searchTexts(state = {}, action) {
	switch (action.type) {
		case SET_REPO:
			return {
				...state,
				repo: action.searchText,
			};
		default:
			return state;
	}
}
