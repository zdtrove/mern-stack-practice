import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_ERROR,
	CLEAR_ERROR,
	LOGOUT
} from '../types';
import axios from 'axios';

const config = {
	headers: {
		'Content-Type':'application/json'
	}
}

export const loadUser = () => async dispatch => {
	try {
		const res = axios.get('/api/users', config);
		dispatch({
			type: LOAD_USER,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: LOAD_USER_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const register = userData => async dispatch => {
	try {
		const res = await axios.post('/api/users/register', userData, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: REGISTER_FAIL,
			payload: err.response.data.errors
		});
	}
}

export const login = userData => async dispatch => {
	try {
		const res = await axios.post('/api/users/login', userData, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
			payload: err.response.data.errors
		});
	}
}

export const setError = err => dispatch => {
	dispatch({
		type: SET_ERROR,
		payload: err
	});
}

export const clearError = () => dispatch => {
	dispatch({
		type: CLEAR_ERROR
	});
}

export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT
	});
}