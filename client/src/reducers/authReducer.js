/**
 * This file defines a reducer function that manages the authentication state of the application. 
 * It handles actions related to authentication and updates the state accordingly.
 */

import { FETCH_USER } from '../actions/types';


/* 
    A reducer is a function used in Redux, a state management library for JavaScript applications,to manage the state of the application. 
    This is the reducer for the authentication state.
    The reducer is a function that takes in two parameters: the current state and an action.
    The reducer then returns a new state based on the action type.
*/
/**
 * 
 the FETCH_USER action type and its action.payload are used to determine the logged-in status of a user 
 and return the appropriate state. 
 */
export default function(state = null, action) {
    console.log(action);
    //The switch statement checks the action.type to determine how to update the state.
    switch (action.type) {
        // FETCH_USER triggers the authentication check.
        // The result of the check (user object or null) is passed as action.payload.
        case FETCH_USER:
            return action.payload || false; 
        default:
            return state;
    }
}