import * as UserAPIUtil from "../util/api_calls/user_api_util";


// ---------------------- Constants ----------------------

export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER";


// ---------------------- Normal Actions ----------------------

const receiveUpdatedUser = user => ({
    type: RECEIVE_UPDATED_USER,
    user
});


// ---------------------- Function Actions ----------------------

export const updateUser = formData => dispatch => UserAPIUtil.updateUser(formData)
    .then(user => dispatch(receiveUpdatedUser(user)));
