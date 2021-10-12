/**
 * Helper method used in UserShow in the server display. Basically, when sending 
 * a message from the user sidebar inside a server, we do two different things
 * based on whether or not the DM already exists.
 * 
 * @param {Obj} state - All of state
 * @param {Number} currentUserId - Current user's id
 * @param {Number} otherUserId - Target user's id
 * @returns - Boolean indicating whether or not two users have a DM going
 */
export const dmExists = (state, currentUserId, otherUserId) => {
    const allDMs = Object.values(state.entities.directMessages);

    for (let i = 0; i < allDMs.length; i++) {
        if ((allDMs[i].user1Id === currentUserId && allDMs[i].user2Id === otherUserId) ||
            (allDMs[i].user2Id === currentUserId && allDMs[i].user1Id === otherUserId))
            return true;
    }
    return false;
}