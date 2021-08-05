import { RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";

const serversReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_CURRENT_USER_DETAILS:
            // -------------------- RIGHT NOW REMOVES ALL OTHER SERVERS --------------------
            return action.details.servers;
            // -----------------------------------------------------------------------------
        default:
            return state;
    }
}

export default serversReducer;