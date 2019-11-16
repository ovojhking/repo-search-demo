import {
	createStore,
	combineReducers,
	compose,
	applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import searchTexts from 'Store/searchText/searchTextReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
	searchTexts,
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk),
));

export default store;
