
// --------------------- TEMP UTIL ---------------------
export const fetchAllMessages = () => (
    $.ajax({
        method: "GET",
        url: "/api/messages"
    })
);
// ------------------------------------------------------

export const createMessage = message => (
    $.ajax({
        method: "POST",
        url: "/api/messages",
        data: { message }
    })
);

export const updateMessage = message => (
    $.ajax({
        method: "PATCH",
        url: `/api/messages/${message.id}`,
        data: { message }
    })
);

export const deleteMessage = messageId => (
    $.ajax({
        method: "DELETE",
        url: `/api/messages/${messageId}`
    })
);