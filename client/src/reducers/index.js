// Desc: Combine all reducers into one
import { combineReducers} from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});