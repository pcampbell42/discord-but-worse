import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";


// mstp for both auth and protected
const mstp = state => ({
    loggedIn: Boolean(state.session.id)
});


// -------------------- Auth Route --------------------
const Auth = ({ component: Component, path, loggedIn, exact }) => {
    return (
        <Route path={path} exact={exact} render={props =>
            loggedIn ? (<Redirect to="/app/home" />) : (<Component {...props} />)
        } />
    );
};
export const AuthRoute = withRouter(connect(mstp)(Auth));


// -------------------- Protected Route --------------------
const Protected = ({ component: Component, path, loggedIn, exact }) => {
    return (
        <Route path={path} exact={exact} render={props =>
            (!loggedIn) ? (<Redirect to="/" />) : (<Component {...props} />)
        } />
    );
};
export const ProtectedRoute = withRouter(connect(mstp)(Protected));