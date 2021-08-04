import * as MessageAPIUtil from "../util/message_api_util";

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export const receiveAllMessages = messages => ({
        type: RECEIVE_ALL_MESSAGES,
        messages
});

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
});

export const deleteMessage = messageId => ({
    type: DELETE_MESSAGE,
    messageId
});


// --------------------- TEMP UTIL ---------------------
export const fetchAllMessages = () => dispatch => MessageAPIUtil.fetchAllMessages()
    .then(messages => dispatch(receiveAllMessages(messages)))
// -----------------------------------------------------



// --------------------- Not Needed with Websockets ---------------------

export const createMessage = formMessage => dispatch => MessageAPIUtil.createMessage(formMessage)
    .then(message => dispatch(receiveMessage(message)));

export const updateMessage = formMessage => dispatch => MessageAPIUtil.updateMessage(formMessage)
    .then(message => dispatch(receiveMessage(message)));

export const removeMessage = messageId => dispatch => MessageAPIUtil.deleteMessage(messageId)
    .then(() => dispatch(deleteMessage(messageId)));