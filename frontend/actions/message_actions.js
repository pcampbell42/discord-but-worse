
// ---------------------- Constants ----------------------

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";


// ---------------------- Normal Actions ----------------------

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
