import * as DMAPIUtil from "../util/direct_message_api_util";

export const RECEIVE_DIRECT_MESSAGE = "RECEIVE_DIRECT_MESSAGE";
export const RECEIVE_DIRECT_MESSAGE_DETAILS = "RECEIVE_DIRECT_MESSAGE_DETAILS";

const receiveDirectMessage = directMessage => ({
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage
});

const receiveDirectMessageDetails = details => ({
    type: RECEIVE_DIRECT_MESSAGE_DETAILS,
    details
});

export const createDirectMessage = formDM => dispatch => DMAPIUtil.createDirectMessage(formDM)
    .then(directMessage => dispatch(receiveDirectMessage(directMessage)));

export const fetchCurrentDirectMessageDetails = directMessageId => dispatch => DMAPIUtil.fetchCurrentDirectMessageDetails(directMessageId)
    .then(details => dispatch(receiveDirectMessageDetails(details)));
    