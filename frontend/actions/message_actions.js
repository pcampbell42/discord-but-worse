import * as MessageAPIUtil from "../util/message_api_util";

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

const receiveAllMessages = messages => ({
        type: RECEIVE_ALL_MESSAGES,
        messages
});

const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
});

const deleteMessage = messageId => ({
    type: DELETE_MESSAGE,
    messageId
});

// --------------------- TEMP UTIL ---------------------
// export const fetchAllMessages = () => dispatch => MessageAPIUtil.fetchAllMessages()
//     .then(messages => dispatch(receiveAllMessages(messages)));

export const fetchAllMessages = () => dispatch => MessageAPIUtil.fetchAllMessages()
    .then(messages => dispatch(receiveAllMessages(messages)))
// -----------------------------------------------------

export const createMessage = formMessage => dispatch => MessageAPIUtil.createMessage(formMessage)
    .then(message => dispatch(receiveMessage(message)));

export const updateMessage = formMessage => dispatch => MessageAPIUtil.updateMessage(formMessage)
    .then(message => dispatch(receiveMessage(message)));

export const removeMessage = messageId => dispatch => MessageAPIUtil.deleteMessage(messageId)
    .then(() => dispatch(deleteMessage(messageId)));