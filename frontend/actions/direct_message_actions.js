import * as DMAPIUtil from "../util/api_calls/direct_message_api_util";


// ---------------------- Constants ----------------------

export const RECEIVE_DIRECT_MESSAGE = "RECEIVE_DIRECT_MESSAGE";


// ---------------------- Normal Actions ----------------------

const receiveDirectMessage = directMessage => ({
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage
});


// ---------------------- Function Actions ----------------------

export const createDirectMessage = formDM => dispatch => DMAPIUtil.createDirectMessage(formDM)
    .then(directMessage => dispatch(receiveDirectMessage(directMessage)));
