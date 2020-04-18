import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AuthReducer from './reducers/AuthReducer';

const initialState = {};
const middleware = [thunk, createLogger()];
const reducers = combineReducers({
	auth: AuthReducer
});
const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;