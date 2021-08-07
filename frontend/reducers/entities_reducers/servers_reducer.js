import { RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";
import { RECEIVE_ALL_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from "../../actions/server_actions";

const serversReducer = (state = {}, action) => {
    Object.freeze(state);
    
    switch(action.type) {
        case RECEIVE_CURRENT_USER_DETAILS:
            // -------------------- RIGHT NOW REMOVES ALL OTHER SERVERS --------------------
            return Object.assign({}, state, action.details.servers);
            // -----------------------------------------------------------------------------

        case RECEIVE_ALL_SERVERS:
            return action.servers;
        
        case RECEIVE_SERVER:
            return Object.assign({}, state, { [action.data.server.id]: action.data.server });

        case REMOVE_SERVER:
            let nextState = Object.assign({}, state);
            delete nextState[action.serverId];
            return nextState;

        default:
            return state;
    }
}

export default serversReducer;