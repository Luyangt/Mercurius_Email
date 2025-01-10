/**
 * This file defines action creators in a Redux-based application. 
 * These functions are used to handle asynchronous operations (like making API requests) and then dispatch actions to update the Redux store.
 */

import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    //Makes a GET request to the endpoint /api/current_user to fetch user information (e.g., from the backend API).
	//Returns a response (res) containing the user’s data.
    const res = await axios.get('/api/current_user')
    //By dispatching the action with the type FETCH_USER and the user's data as the payload, 
    //the application updates the Redux store with the current user's information. 
    dispatch({ type : FETCH_USER, payload : res.data });
};  

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api.stripe', token);
    dispatch({ type : FETCH_USER, payload : res.data });
};