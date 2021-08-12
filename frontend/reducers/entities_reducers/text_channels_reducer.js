import { RECEIVE_TEXT_CHANNEL, REMOVE_TEXT_CHANNEL, RECEIVE_TEXT_CHANNEL_DETAILS } from "../../actions/text_channel_actions";
import { RECEIVE_SERVER, RECEIVE_SERVER_DETAILS } from "../../actions/server_actions";
import { RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const textChannelsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_TEXT_CHANNEL:
            return Object.assign({}, state, { [action.textChannel.id]: action.textChannel });

        case REMOVE_TEXT_CHANNEL:
            let nextState = Object.assign({}, state);
            delete nextState[action.textChannelId];
            return nextState;

        case RECEIVE_TEXT_CHANNEL_DETAILS:
            return Object.assign({}, state, { [action.details.textChannel.id]: action.details.textChannel });


        // case RECEIVE_SERVER:
        //     return Object.assign({}, state, { [action.data.textChannel.id]: action.data.textChannel });
            
        case RECEIVE_SERVER_DETAILS:
            return Object.assign({}, state, action.details.textChannels);

        case RECEIVE_CURRENT_USER_DETAILS:
            return Object.assign({}, state, action.details.textChannels);

        case LOGOUT_CURRENT_USER:
            return {};
    
        default:
            return state;
    }
}

export default textChannelsReducer;