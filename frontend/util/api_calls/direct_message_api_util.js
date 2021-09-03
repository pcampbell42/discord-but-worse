
export const createDirectMessage = directMessage => (
    $.ajax({
        method: "POST",
        url: "api/direct_messages",
        data: { direct_message: directMessage }
    })
);
