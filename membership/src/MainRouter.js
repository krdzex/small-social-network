import React, { Component } from "react";
import { Route, Switch } from "react-router-dom"
import Home from "./core/Home";
import Users from "./user/Users"
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile"
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
class MainRouter extends Component {
    render() {
        return (
            <div>
                <Menu />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                    <Route exact path="/user/:userId" component={Profile} />
                </Switch>
            </div>
        )
    }
}
export default MainRouter;