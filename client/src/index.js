import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
//provider is a react component that knows how to read changes from the redux store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
//reduxThunk is a middleware that allows us to dispatch actions with a slight delay
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


//createStore is a function that creates a new instance of the redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/* 
ReactDOM.render is to render the App component to the root div in the index.html file
two arguments: the first is the JSX to render,
and the second is the DOM element where the rendering should occur.
*/
ReactDOM.render(
    //The <Provider> component makes the Redux store available to any nested 
    //components that need to access the Redux state
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);