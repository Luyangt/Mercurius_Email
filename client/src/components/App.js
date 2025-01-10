import React, { Component } from 'react';
//BrowserRouter is the brains of react-router, tells react-router how to behave
//Route is a react component used to set up a rule between a certain route the user visits and a set of components that will be visible on the screen
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;


/**
 * 	In React, “mounting” refers to the process where a component is added to the DOM for the first time.
 * 1.	React creates the component instance.
	2.	render() is called:
	•	Virtual DOM is generated.
	•	Components like Header and Landing are invoked and prepared for display.
	3.	React updates the real DOM, and the initial UI appears on the screen.
	4.	componentDidMount() is called, triggering side effects (e.g., fetching user data).
	5.	Redux updates the authentication state, and React automatically re-renders components as needed.

    If the user’s state changes (e.g., they log out or log in), the Redux store updates again.
	•	React detects this change and automatically re-renders the relevant components to reflect the new state.

 */
class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    //render() invokes components like Header and Landing so they can be displayed on the screen.(create components)
    render() {
        return (
            <div className="container">
            <BrowserRouter> 
            <div>
                <Header />
                <Route exact path="/" component = {Landing} />
                <Route exact path="/surveys" component = {Dashboard} />
                <Route exact path="/surveys/new" component = {SurveyNew} />
            </div>
            </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);