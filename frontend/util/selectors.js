/**
 * Selector that takes the current user id and the server id and returns the current
 * user's membership id for that server. Used in ServerIconDisplay when leaving a 
 * server.
 * @param {Number} currentUserId - The current user's id
 * @param {Number} serverId - The server id
 * @param {Object} memberships - The entire memberships slice of state in Obj format
 * @returns - The current user's membership id for the server
 */
export const findMembershipId = (currentUserId, serverId, memberships) => {
    for (const i in memberships) {
        if (currentUserId === memberships[i].userId && serverId === memberships[i].serverId)
            return memberships[i].id;
    }
}


/**
 * Selector that takes state and returns an array of all the server ids that the 
 * current user is a part of. Used in ServerShow for the home page server index - 
 * basically, the server is not shown on the index if the user is already in it.
 * @param {Obj} state - All of state
 * @returns - Array of the current user's joined server ids
 */
export const currentUserServerIds = state => {
    const currentUserId = state.session.id;

    const memberships = state.entities.memberships;
    let joinedServerIds = [];

    for (const i in memberships) {
        if (currentUserId === memberships[i].userId) joinedServerIds.push(memberships[i].serverId);
    }

    return joinedServerIds;
}


/**
 * Similar to the previous selector, except this one returns an array of the current 
 * user's servers instead of just server ids. Note that this also sorts by membership 
 * id. User in the ServerSidebar to show all the current user's servers.
 * @param {Obj} state - All of state 
 * @returns - Array of the current user's joined servers
 */
export const currentUserServers = state => {
    const currentUserId = state.session.id;

    const memberships = state.entities.memberships;
    let joinedServerIds = [];

    for (const i in memberships) {
        if (currentUserId === memberships[i].userId)
            joinedServerIds.push(memberships[i].serverId);
    }

    const servers = state.entities.servers;
    let joinedServers = [];

    for (let i = 0; i < joinedServerIds.length; i++) {
        joinedServers.push(servers[joinedServerIds[i]]);
    }

    return joinedServers.reverse();
}


/**
 * Selector that gets all of the users for a specified server. Used in UserSidebar
 * to show all the users when inside a server.
 * @param {Obj} state - All of state
 * @param {Number} currentServerId - Server id
 * @returns - Array of all the users in the specified server
 */
export const currentServerUsers = (state, currentServerId) => {
    const memberships = state.entities.memberships;
    let serverMemberships = [];

    for (const i in memberships) {
        if (memberships[i].serverId.toString() === currentServerId) 
            serverMemberships.push(memberships[i]);
    }


    let serverUsers = [];
    for (let i = 0; i < serverMemberships.length; i++) {
        serverUsers.push(state.entities.users[serverMemberships[i].userId]);
    }

    return serverUsers;
}


/**
 * Gets a server's first text channel's id. Used in ServerIconDisplay to know what
 * url to link to when selecting a server.
 * @param {Obj} state - All of state
 * @param {Number} currentServerId - Server id
 * @returns - A server's first text channel's id
 */
export const getFirstTextChannelId = (state, currentServerId) => {
    const textChannels = Object.values(state.entities.textChannels);

    for (let i = 0; i < textChannels.length; i++) {
        if (textChannels[i].serverId === currentServerId) return textChannels[i].id;
    }
}


/**
 * Selector that returns all text channels for a given server.
 * @param {Obj} state - All of state
 * @param {Number} currentServerId - Server id
 * @returns - Array of text channels for a server
 */
export const getServerTextChannels = (state, currentServerId) => {
    const textChannels = Object.values(state.entities.textChannels);

    let selectedChannels = [];
    for (let i = 0; i < textChannels.length; i++) {
        if (textChannels[i].serverId.toString() === currentServerId) 
            selectedChannels.push(textChannels[i]);
    }

    return selectedChannels;
}


/**
 * Selector that gets all messages for a DM or a text channel.
 * @param {Obj} state - All of state
 * @returns - Array of all messages for a DM or text channel
 */
export const getMessagesForChannel = state => {
    let currentLocation = window.location.hash;

    let chatRoomType;
    if (currentLocation.includes("servers")) chatRoomType = "TextChannel";
    if (currentLocation.includes("conversations")) chatRoomType = "DirectMessage";

    const chatRoomId = parseInt(currentLocation.split("/").slice(-1).pop());

    const allMessages = Object.values(state.entities.messages);

    let selectedMessages = [];
    for (let i = 0; i < allMessages.length; i++) {
        if (allMessages[i].messageableType === chatRoomType && allMessages[i].messageableId === chatRoomId)
            selectedMessages.push(allMessages[i]);
    }

    return selectedMessages;
}


/**
 * Selector that gets all of the users that the current user has DMs with. Used in
 * ConversationSidebar to show the profile pictures / names of dms.
 * @param {Obj} state - All of state 
 * @returns - Object containing all of the users that the current user has DMs with
 */
export const getUsersForDms = state => {
    const allUsers = state.entities.users;
    const allDMs = Object.values(state.entities.directMessages);
    const currentUserId = state.session.id

    let selectedUsers = {};
    for (const i in allUsers) {
        for (let j = 0; j < allDMs.length; j++) {
            if ((allUsers[i].id === allDMs[j].user1Id || allUsers[i].id === allDMs[j].user2Id)
                && allUsers[i].id !== currentUserId) {
                selectedUsers[allUsers[i].id] = allUsers[i];
            }
        }
    }

    return selectedUsers;
}


/**
 * Selector that gets the DM id of a DM between the current user and someone else.
 * @param {Obj} state - All of state
 * @param {Number} currentUserId - Current user's id
 * @param {Number} otherUserId - Target user's id
 * @returns - DM id
 */
export const getDMId = (state, currentUserId, otherUserId) => {
    const allDMs = Object.values(state.entities.directMessages);

    for (let i = 0; i < allDMs.length; i++) {
        if ((allDMs[i].user1Id === currentUserId && allDMs[i].user2Id === otherUserId) ||
            (allDMs[i].user2Id === currentUserId && allDMs[i].user1Id === otherUserId))
            return allDMs[i].id;
    }
}