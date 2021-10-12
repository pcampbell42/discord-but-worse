/**
 * Helper method that creates a websocket connection for the specified text channel or dm.
 * 
 * @param {string} thread_type - Specifies if the thread is for a direct message (input = dm),
 *         or a text channel (input = tc). This input is needed because if the only input were thread_id,
 *         a text channel and a dm might have the same id, and thus would be the same channel.
 * @param {number} thread_id - The text channel's / dm's id
 * @param {function} receiveAllMessages - Input should be dispatch(receiveAllMessages(...))
 * @param {function} receiveMessage - Input should be dispatch(receiveMessage(...))
 * @param {function} deleteMessage - Input should be dispatch(deleteMessage(...))
 */
export const createSubscription = (thread_type, thread_id, receiveAllMessages, receiveMessage, deleteMessage) => {
    App.cable.subscriptions.create(
        { channel: "ChatChannel", thread_type: thread_type, thread_id: thread_id },
        {
            // When data is received from the backend, dispatch one of the following actions...
            received: data => {
                switch (data.type) {
                    case "index":
                        receiveAllMessages(data.messages);
                        break;

                    case "create":
                        receiveMessage(data.message);
                        break;

                    case "update":
                        receiveMessage(data.message);
                        break;

                    case "destroy":
                        deleteMessage(data.messageId);
                        break;

                    default:
                        break;
                }
            },

            // Functions for creating / updating / deleting a message. Sends data to backend.
            create: function (data) { return this.perform("create", data) },
            update: function (data) { return this.perform("update", data) },
            destroy: function (data) { return this.perform("destroy", data) }
        }
    )
}


/**
 * Helper method that finds the correct websocket subscription for the current text channel
 * or DM. Used when performing any message CRUD.
 * @param {string} chatRoomType - Specified text channel (input = tc) or dm (input = dm)
 * @param {number} chatRoomId - The text channel's / dm's id
 * @returns - Returns the index of the correct websocket subscription in the subscriptions array.
 */
export const findCurrentSubscription = (chatRoomType = undefined, chatRoomId = undefined) => {
    let currentLocation = window.location.hash;

    if (chatRoomType === undefined) {
        if (currentLocation.includes("servers")) chatRoomType = "tc";
        if (currentLocation.includes("conversations")) chatRoomType = "dm";
    }

    if (chatRoomId === undefined) {
        chatRoomId = parseInt(currentLocation.split("/").slice(-1).pop());
    }

    for (let i = 0; i < App.cable.subscriptions.subscriptions.length; i++) {
        let parsedIdentifier = JSON.parse(App.cable.subscriptions.subscriptions[i].identifier);
        if (parsedIdentifier.thread_type === chatRoomType && parseInt(parsedIdentifier.thread_id) === chatRoomId) {
            return i;
        }
    }
}


/**
 * Simple helper method for removing all active websocket subscriptions.
 */
export const removeAllSubscriptions = () => {
    App.cable.subscriptions.subscriptions.forEach(subscription =>
        App.cable.subscriptions.remove(subscription)
    );
}