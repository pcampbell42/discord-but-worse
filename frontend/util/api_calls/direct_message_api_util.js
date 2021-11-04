
export const createDirectMessage = directMessage => (
    $.ajax({
        method: "POST",
        url: "api/direct_messages",
        data: { direct_message: directMessage }
    })
);

export const updateDirectMessage = directMessage => (
    $.ajax({
        method: "PATCH",
        url: `api/direct_messages/${directMessage.id}`,
        data: { direct_message: directMessage }
    })
);
