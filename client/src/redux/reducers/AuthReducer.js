import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_ERROR,
	CLEAR_ERROR,
	LOGOUT,
	SET_AUTHENTICATED,
	LOAD_AUTH,
	GET_ALL_USERS,
	LOAD_AUTH_ERROR,
	GET_ALL_USERS_ERROR,
	GET_USER,
	GET_USER_ERROR,
	UPDATE_USER,
	UPDATE_USER_ERROR
} from '../types';

const initialState = {
	loading: false,
	isAuthenticated: false,
	errors: null,
	users: [],
	user: {},
	userDetail: {}
}

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true,
				errors: null
			}
		case LOAD_AUTH:
			return {
				...state,
				user: payload
			}
		case GET_ALL_USERS:
			return {
				...state,
				users: payload
			}
		case GET_USER:
			return {
				...state,
				userDetail: payload
			}
		case GET_USER_ERROR:
			return {
				...state,
				userDetail: {}
			}
		case UPDATE_USER:
			return {
				...state,
				userDetail: payload
			}
		case UPDATE_USER_ERROR:
			return {
				...state,
				errors: payload
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
		case LOAD_AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				errors: payload,
				user: {}
			}
		case GET_ALL_USERS_ERROR:
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