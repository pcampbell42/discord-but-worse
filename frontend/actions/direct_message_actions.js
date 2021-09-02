import * as DMAPIUtil from "../util/api_calls/direct_message_api_util";


// ---------------------- Constants ----------------------

export const RECEIVE_DIRECT_MESSAGE = "RECEIVE_DIRECT_MESSAGE";
export const RECEIVE_DIRECT_MESSAGE_DETAILS = "RECEIVE_DIRECT_MESSAGE_DETAILS";


// ---------------------- Normal Actions ----------------------

const receiveDirectMessage = directMessage => ({
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage
});

const receiveDirectMessageDetails = details => ({
    type: RECEIVE_DIRECT_MESSAGE_DETAILS,
    details
});


// ---------------------- Function Actions ----------------------

export const createDirectMessage = formDM => dispatch => DMAPIUtil.createDirectMessage(formDM)
    .then(directMessage => dispatch(receiveDirectMessage(directMessage)));

export const fetchCurrentDirectMessageDetails = directMessageId => dispatch => DMAPIUtil.fetchCurrentDirectMessageDetails(directMessageId)
    .then(details => dispatch(receiveDirectMessageDetails(details)));
