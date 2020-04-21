import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_ERROR,
	CLEAR_ERROR,
	LOGOUT,
	SET_AUTHENTICATED,
	LOAD_USER,
	LOAD_ALL_USERS,
	LOAD_USER_ERROR,
	LOAD_ALL_USERS_ERROR
} from '../types';

const initialState = {
	isAuthenticated: false,
	errors: null,
	user: null
}

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true,
				errors: null
			}
		case LOAD_USER:
			return {
				...state,
				user: payload
			}
		case LOAD_ALL_USERS:
			return {
				...state,
				users: payload
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				isAuthenticated: true,
				errors: null
			}
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case LOAD_USER_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				errors: payload
			}
		case LOAD_ALL_USERS_ERROR:
			return {
				...state,
				users: null
			}
		case SET_ERROR:
			return {
				...state,
				errors: payload
			}
		case CLEAR_ERROR:
			return {
				...state,
				errors: null
			}
		default:
			return state;
	}
}