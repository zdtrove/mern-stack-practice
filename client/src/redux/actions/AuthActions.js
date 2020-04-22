import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_ERROR,
	CLEAR_ERROR,
	LOGOUT,
	LOAD_AUTH,
	GET_ALL_USERS,
	LOAD_AUTH_ERROR,
	GET_ALL_USERS_ERROR,
	GET_USER,
	GET_USER_ERROR,
	UPDATE_USER,
	UPDATE_USER_ERROR
} from '../types';
import axios from 'axios';

const config = {
	headers: {
		'Content-Type':'application/json'
	}
}

export const loadAuth = () => async dispatch => {
	if (localStorage.token) {
		axios.defaults.headers.common['Authorization'] = localStorage.token;
	}
	try {
		const res = await axios.get('/api/auth', config);
		dispatch({
			type: LOAD_AUTH,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: LOAD_AUTH_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const getUser = id => async dispatch => {
	if (localStorage.token) {
		axios.defaults.headers.common['Authorization'] = localStorage.token;
	}
	try {
		const res = await axios.get(`/api/auth/user/${id}`, config);
		dispatch({
			type: GET_USER,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_USER_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const updateUser = userData => async dispatch => {
	if (localStorage.token) {
		axios.defaults.headers.common['Authorization'] = localStorage.token;
	}
	try {
		const res = await axios.put(`/api/auth/user/${userData._id}`, userData, config);
		dispatch({
			type: UPDATE_USER,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: UPDATE_USER_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const getUsers = () => async dispatch => {
	if (localStorage.token) {
		axios.defaults.headers.common['Authorization'] = localStorage.token;
	}
	try {
		const res = await axios.get('/api/auth/users', config);
		dispatch({
			type: GET_ALL_USERS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ALL_USERS_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const register = userData => async dispatch => {
	try {
		const res = await axios.post('/api/auth/register', userData, config);
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
		const res = await axios.post('/api/auth/login', userData, config);
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