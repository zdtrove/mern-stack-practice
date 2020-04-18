import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_ERROR,
	CLEAR_ERROR,
	LOGOUT
} from '../types';

const initialState = {
	isAuthenticated: false,
	errors: null
}

export default function (state = initialState, {type, payload}) {
	switch (type) {
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
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				errors: payload
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