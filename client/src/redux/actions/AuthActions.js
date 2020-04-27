import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_ERROR,
	CLEAR_ERROR,
	LOGOUT,
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
import axios from 'axios';
import apiCaller from '../../utils/apiCaller';

export const loadAuth = () => async dispatch => {
	if (localStorage.token) {
		axios.defaults.headers.common['Authorization'] = localStorage.token;
	}
	try {
		const res = await apiCaller('GET', 'auth', '', '');
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
	dispatch({ type: LOADING });
	try {
		const res = await apiCaller('GET', 'auth', `user/${id}`, '');
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
	dispatch({ type: LOADING });
	try {
		const res = await apiCaller('PUT', 'auth', `user/${userData._id}`, userData);
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

export const deleteUser = id => async dispatch => {
	try {
		await apiCaller('DELETE', 'auth', `user/${id}`, '');
		dispatch({
			type: DELETE_USER,
			payload: id
		});
	} catch (err) {
		dispatch({
			type: DELETE_USER_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const getUsers = () => async dispatch => {
	dispatch({ type: LOADING });
	try {
		const res = await apiCaller('GET', 'auth', 'users', '');
		dispatch({
			type: GET_USERS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ALL_USERS_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const insertUsers = () => async dispatch => {
	dispatch({ type: LOADING });
	try {
		const res = await apiCaller('GET', 'auth', 'users/insertUsers', '');
		dispatch({
			type: INSERT_USERS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: INSERT_USERS_ERROR,
			payload: err.response.data.errors
		});
	}
}

export const register = userData => async dispatch => {
	dispatch({ type: LOADING });
	try {
		const res = await apiCaller('POST', 'auth', 'register', userData);
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
	dispatch({ type: LOADING });
	try {
		const res = await apiCaller('POST', 'auth', 'login', userData);
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
		type: LOGOUT,
		payload: {}
	});
}