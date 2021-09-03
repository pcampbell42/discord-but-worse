import { RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE, DELETE_MESSAGE } from "../../actions/message_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";


const messagesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_MESSAGES:
            return Object.assign({}, state, action.messages);

        case RECEIVE_MESSAGE:
            return Object.assign({}, state, { [action.message.id]: action.message });

        case DELETE_MESSAGE:
            let newState = Object.assign({}, state);
            delete newState[action.messageId];
            return newState;

        case LOGOUT_CURRENT_USER:
            return {};

        default:
            return state;
    }
}


export default messagesReducer;