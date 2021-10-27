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


/**
 * Helper method used in Message component that returns the date to show for the 
 * message. The three formats are "Today at 1:00 PM", "Yesterday at 1:00 PM", 
 * or "10/10/21".
 * @param {String} dateString - String for the date from updatedAt from the backend
 * @returns - String of the exact date to display for the message
 */
export const getDateToShow = (dateString) => {
    let messageDate = new Date(dateString); // Turn date string into date object
    let today = new Date(); // Get current date / time
    let yesterday = new Date(); // Get yesterday's date
    yesterday.setDate(yesterday.getDate() - 1);

    // If message was sent today
    if (messageDate.toDateString() === today.toDateString()) {
        let returnTime = _formatReturnTime(dateString); // Convert time to proper format
        return `Today at ${returnTime}`;
    }
    // If message was sent yesterday (case 1 - same month, same year, 1 day less)
    else if (messageDate.toDateString() === yesterday.toDateString()) {
        let returnTime = _formatReturnTime(dateString);
        return `Yesterday at ${returnTime}`;
    }
    // If message is older
    else {
        let messageDateArray = dateString.split("T")[0].split("-"); // Get message date (year, month, day)
        return `${messageDateArray[1]}/${messageDateArray[2]}/${messageDateArray[0]}`;
    }
}


/**
 * Helper method for getDateToShow that converts the backend time string to a showable
 * time (mostly just converts from military time).
 * @param {String} dateString - String for the date from updatedAt from the backend
 * @returns - String of the exact time to display for the message
 */
const _formatReturnTime = (dateString) => {
    let messageTime = dateString.split("T")[1].split(":");
    let messageHour = parseInt(messageTime[0]);

    // If 12 AM...
    if (messageHour === 0) {
        return `12:${messageTime[1]} AM`;
    }
    // If 1AM - 9AM...
    else if (messageHour < 10) {
        return `${messageTime[0].charAt[1]}:${messageTime[1]} AM`;
    }
    // If 10AM - 11AM...
    else if (messageHour < 12) {
        return `${messageTime[0]}:${messageTime[1]} AM`;
    }
    // If 12 PM...
    else if (messageHour === 12) {
        return `${messageTime[0]}:${messageTime[1]} PM`;
    }
    // If 1PM - 11PM...
    else {
        return `${messageTime[0] - 12}:${messageTime[1]} PM`;
    }
}