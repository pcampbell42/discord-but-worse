import { RECEIVE_DIRECT_MESSAGE, RECEIVE_DIRECT_MESSAGE_DETAILS } from "../../actions/direct_message_actions";

const directMessagesReducer = (state = {}, action) => {
    Object.freeze(state);
    
    switch(action.type) {
        case RECEIVE_DIRECT_MESSAGE:
            return Object.assign({}, state, { [action.directMessage.id]: action.directMessage });
            
        case RECEIVE_DIRECT_MESSAGE_DETAILS:
            return Object.assign({}, state, { [action.details.directMessage.id]: action.details.directMessage })
    
        default:
            return state;
    }
}

export default directMessagesReducer;