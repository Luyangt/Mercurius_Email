import React, {Component} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from '../actions';

import Landing from "./Landing";
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() { // 页面加载时自动获取用户数据
        this.props.fetchUser();
    }

    render() {
        return (
                <BrowserRouter>
                    <div className="container">
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys" component={Dashboard}/>
                        <Route exact path="/surveys/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
        );
    }
}

export default connect(null,actions)(App);