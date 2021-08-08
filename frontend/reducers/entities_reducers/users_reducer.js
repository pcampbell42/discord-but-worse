import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_SERVER_DETAILS } from "../../actions/server_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });

        case RECEIVE_SERVER_DETAILS:
            return Object.assign({}, state, action.details.users);
    
        default:
            return state;
    }
}

export default usersReducer;