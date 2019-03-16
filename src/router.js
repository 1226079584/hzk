import React from 'react';
import { Link, NavLink, Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home/home'

class RouterDom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Redirect to="/login"></Redirect>
                </Switch>
            </Router>
        )
    }
}

export default RouterDom
