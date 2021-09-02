import * as TextChannelAPIUtil from "../util/api_calls/text_channel_api_util";


// ---------------------- Constants ----------------------

export const RECEIVE_TEXT_CHANNEL = "RECEIVE_TEXT_CHANNEL";
export const REMOVE_TEXT_CHANNEL = "REMOVE_TEXT_CHANNEL";
export const RECEIVE_TEXT_CHANNEL_DETAILS = "RECEIVE_TEXT_CHANNEL_DETAILS";


// ---------------------- Normal Actions ----------------------

const receiveTextChannel = textChannel => ({
    type: RECEIVE_TEXT_CHANNEL,
    textChannel
});

const removeTextChannel = textChannelId => ({
    type: REMOVE_TEXT_CHANNEL,
    textChannelId
});

const receiveTextChannelDetails = details => ({
    type: RECEIVE_TEXT_CHANNEL_DETAILS,
    details
});


// ---------------------- Function Actions ----------------------

export const createTextChannel = formTextChannel => dispatch => TextChannelAPIUtil.createTextChannel(formTextChannel)
    .then(textChannel => dispatch(receiveTextChannel(textChannel)));

export const updateTextChannel = formTextChannel => dispatch => TextChannelAPIUtil.updateTextChannel(formTextChannel)
    .then(textChannel => dispatch(receiveTextChannel(textChannel)));

export const deleteTextChannel = textChannelId => dispatch => TextChannelAPIUtil.deleteTextChannel(textChannelId)
    .then(() => dispatch(removeTextChannel(textChannelId)));

export const fetchCurrentTextChannelDetails = textChannelId => TextChannelAPIUtil.fetchCurrentTextChannelDetails(textChannelId)
    .then(details => dispatch(receiveTextChannelDetails(details)));
