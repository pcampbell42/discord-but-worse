import { RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";

const membershipsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_CURRENT_USER_DETAILS:
            return Object.assign({}, state, action.details.memberships)

        default:
            return state;
    }
}

export default membershipsReducer;