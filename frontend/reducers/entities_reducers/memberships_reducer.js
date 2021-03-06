import { RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";
import { RECEIVE_MEMBERSHIP, REMOVE_MEMBERSHIP } from "../../actions/membership_actions";
import { RECEIVE_SERVER, REMOVE_SERVER, RECEIVE_SERVER_DETAILS } from "../../actions/server_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";


const membershipsReducer = (state = {}, action) => {
    Object.freeze(state);

    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER_DETAILS:
            return Object.assign({}, state, action.details.memberships)

        case RECEIVE_MEMBERSHIP:
            return Object.assign({}, state, { [action.membership.id]: action.membership })

        case REMOVE_MEMBERSHIP:
            delete nextState[action.membershipId];
            return nextState;

        case REMOVE_SERVER:
            for (const i in nextState) {
                if (nextState[i].serverId === action.serverId) delete nextState[i];
            }
            return nextState;

        case RECEIVE_SERVER:
            return Object.assign({}, state, { [action.data.membership.id]: action.data.membership });

        case RECEIVE_SERVER_DETAILS:
            return Object.assign({}, state, action.details.memberships)

        case LOGOUT_CURRENT_USER:
            return {};

        default:
            return state;
    }
}


export default membershipsReducer;