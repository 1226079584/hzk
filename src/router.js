import React from 'react';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home/home'
import HouseList from './components/index/houseList'

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
                    <Route exact path="/houseList" component={HouseList} />
                    <Redirect to="/login"></Redirect>
                </Switch>
            </Router>
        )
    }
}

export default RouterDom
