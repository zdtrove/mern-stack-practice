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
	GET_USERS,
	LOAD_AUTH_ERROR,
	GET_ALL_USERS_ERROR,
	GET_USER,
	GET_USER_ERROR,
	UPDATE_USER,
	UPDATE_USER_ERROR,
	DELETE_USER,
	DELETE_USER_ERROR,
	INSERT_USERS,
	INSERT_USERS_ERROR,
	LOADING
} from '../types';

const initialState = {
	loading: false,
	isAuthenticated: false,
	errors: {},
	users: [],
	user: {},
	userDetail: {}
}

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case LOADING:
			return {
				...state,
				loading: true
			}
		case SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true,
				errors: {}
			}
		case LOAD_AUTH:
			return {
				...state,
				user: payload
			}
		case GET_USERS:
			return {
				...state,
				loading: false,
				users: payload
			}
		case INSERT_USERS:
			return {
				...state,
				loading: false,
				users: [...state.users, ...payload]
			}
		case GET_USER:
			return {
				...state,
				loading: false,
				userDetail: payload
			}
		case GET_USER_ERROR:
			return {
				...state,
				loading: false,
				userDetail: {}
			}
		case UPDATE_USER:
			return {
				...state,
				loading: false,
				userDetail: payload
			}
		case UPDATE_USER_ERROR:
			return {
				...state,
				loading: false,
				errors: payload
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				errors: {}
			}
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case LOAD_AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				errors: payload,
				user: {}
			}
		case GET_ALL_USERS_ERROR:
			return {
				...state,
				loading: false,
				users: []
			}
		case DELETE_USER:
			return {
				...state,
				userDetail: {},
				users: state.users.filter(user => user._id !== payload)
			}
		case SET_ERROR:
		case DELETE_USER_ERROR:
		case INSERT_USERS_ERROR:
			return {
				...state,
				loading: false,
				errors: payload
			}
		case CLEAR_ERROR:
			return {
				...state,
				errors: {}
			}
		default:
			return state;
	}
}