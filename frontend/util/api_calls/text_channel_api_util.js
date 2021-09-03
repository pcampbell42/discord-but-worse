
export const createTextChannel = textChannel => (
    $.ajax({
        method: "POST",
        url: "api/text_channels",
        data: { text_channel: textChannel }
    })
);

export const updateTextChannel = textChannel => (
    $.ajax({
        method: "PATCH",
        url: `api/text_channels/${textChannel.id}`,
        data: { text_channel: textChannel }
    })
);

export const deleteTextChannel = textChannelId => (
    $.ajax({
        method: "DELETE",
        url: `api/text_channels/${textChannelId}`
    })
);
