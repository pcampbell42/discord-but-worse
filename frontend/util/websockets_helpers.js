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
 * @param {function} updateDirectMessage - Input should be dispatch(updateDirectMessage(...))
 */
export const createSubscription = (thread_type, thread_id, receiveAllMessages, receiveMessage, deleteMessage, updateDirectMessage) => {
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

                        // Basically, when a DM is "hidden" by a user, they're still subscribed to the chat channel. 
                        // When a new message arrives for that hidden DM, we check if its hidden, and if it is, we update
                        // the DM to not be hidden. Obviously, this causes excess API calls, but for a small project, it's fine.
                        if (data.message.messageableType === "DirectMessage" && updateDirectMessage)
                            updateDirectMessage({ 
                                id: data.message.messageableId,
                                user1_hidden: false,
                                user2_hidden: false
                            });
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
        if (parsedIdentifier.thread_type === chatRoomType && parseInt(parsedIdentifier.thread_id) === chatRoomId)
            return i;
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


/**
 * Similar to createSubscription, but for user channels. User channels are used for 
 * opening a new DM with websockets and for online status. Note that we still need
 * receiveAllMessages, receiveMessage, and deleteMessage as arguments because we have
 * to call the normal createSubscription within this method (when creating a new DM, 
 * have to create subscriptions to that DM).
 * 
 * @param {Number} user_id - Id of the user whose channel your joining
 * @param {Function} receiveDirectMessage - Action... input should be dispatch(...())
 * @param {Function} receiveUser - Action... input should be dispatch(...())
 * @param {Function} receiveAllMessages - Action... input should be dispatch(...())
 * @param {Function} receiveMessage - Action... input should be dispatch(...())
 * @param {Function} deleteMessage - Action... input should be dispatch(...())
 */
export const createUserSubscription = (user_id, receiveDirectMessage, receiveUser, receiveAllMessages, 
                                        receiveMessage, deleteMessage) => {
    App.cable.subscriptions.create(
        { channel: "UserChannel", user_id: user_id },
        {
            // When data is received from the backend, dispatch one of the following actions...
            received: data => {
                switch (data.type) {
                    case "createDM":
                        // Note that this is actually error prone (kind of). Basically,
                        // if a 3rd user happens to be subscribed to this channel, they would
                        // also become subscribed to the DM channel and have the DM in state. For
                        // a project of this scale, it doesn't really matter so whatever.
                        // An easy fix would be to pass currentUserId as an argument to
                        // createUserSubscription, and then we could just check if the 
                        // currentUserId is one of the 2 ids in the DM.

                        receiveDirectMessage(data.directMessage);

                        // Sometimes, the person receiving the new DM won't have the initiating
                        // user in state. This throws a nasty error, so we need to receive the 
                        // initiator in state.
                        receiveUser(data.user);

                        // Subscribe receivers to DM websocket channel
                        createSubscription("dm", data.directMessage.id, receiveAllMessages, 
                            receiveMessage, deleteMessage);
                        break;

                    default:
                        break;
                }
            },

            // Functions for creating / updating / deleting a DM. Sends data to backend.
            createDM: function (data) { return this.perform("createDM", data) },
        }
    )
}


/**
 * Similar to findCurrentSubscription, but for UserChannels.
 * @param {Number} userId - Target user's id
 * @returns - The index in App.cable.subscriptions.subscriptions
 */
export const findUserSubscription = (userId) => {
    for (let i = 0; i < App.cable.subscriptions.subscriptions.length; i++) {
        let parsedIdentifier = JSON.parse(App.cable.subscriptions.subscriptions[i].identifier);
        if (parsedIdentifier.user_id === userId) return i;
    }
}