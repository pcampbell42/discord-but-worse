import { RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";
import { RECEIVE_MEMBERSHIP, REMOVE_MEMBERSHIP } from "../../actions/membership_actions";
import { REMOVE_SERVER } from "../../actions/server_actions";

const membershipsReducer = (state = {}, action) => {
    Object.freeze(state);

    let nextState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER_DETAILS:
            return Object.assign({}, state, action.details.memberships)

        case RECEIVE_MEMBERSHIP:
            return Object.assign({}, state, { [action.membership.id]: action.membership })

        case REMOVE_MEMBERSHIP:
            delete nextState[action.membershipId];
            return nextState;
        
        case REMOVE_SERVER:
            for (const i in nextState) {
                if (nextState[i].serverId === action.serverId) {
                    delete nextState[i];
                }
            }
            return nextState;

        default:
            return state;
    }
}

export default membershipsReducer;