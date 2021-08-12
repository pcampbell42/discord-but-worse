import { RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";
import { RECEIVE_ALL_SERVERS, RECEIVE_SERVER, REMOVE_SERVER, RECEIVE_SERVER_DETAILS, RECEIVE_UPDATED_SERVER } from "../../actions/server_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

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

        case RECEIVE_UPDATED_SERVER:
            console.log(action.server)
            return Object.assign({}, state, { [action.server.id]: action.server });

        case REMOVE_SERVER:
            let nextState = Object.assign({}, state);
            delete nextState[action.serverId];
            return nextState;

        case RECEIVE_SERVER_DETAILS:
            return Object.assign({}, state, { [action.details.server.id]: action.details.server });

        case LOGOUT_CURRENT_USER:
            return {};

        default:
            return state;
    }
}

export default serversReducer;