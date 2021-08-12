import * as SessionAPIUtil from "./../util/session_api_util";
import { removeAllSubscriptions } from "../util/websockets_helpers";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER_DETAILS = "RECEIVE_CURRENT_USER_DETAILS";

const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const receiveCurrentUserDetails = details => ({
    type: RECEIVE_CURRENT_USER_DETAILS,
    details
});


export const clearSessionErrors = () => ({ 
    type: CLEAR_SESSION_ERRORS
});

export const signup = formUser => dispatch => SessionAPIUtil.signup(formUser)
    .then(user => dispatch(receiveCurrentUser(user)),
        err => dispatch(receiveSessionErrors(err.responseJSON)));

export const login = formUser => dispatch => SessionAPIUtil.login(formUser)
    .then(user => dispatch(receiveCurrentUser(user)),
        err => dispatch(receiveSessionErrors(err.responseJSON)));

export const logout = () => dispatch => SessionAPIUtil.logout()
    .then(() => {
        dispatch(logoutCurrentUser());
        removeAllSubscriptions();
    })

export const fetchCurrentUserDetails = currentUserId => dispatch => SessionAPIUtil.fetchCurrentUserDetails(currentUserId)
    .then(details => dispatch(receiveCurrentUserDetails(details)));
