// ---------------- This also acts as the server errors reducer... ----------------

import { RECEIVE_MEMBERSHIP_ERROR, CLEAR_MEMBERSHIP_ERRORS } from "../../actions/membership_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";


const membershipErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_MEMBERSHIP_ERROR:
            return action.error;

        case CLEAR_MEMBERSHIP_ERRORS:
            return [];

        case LOGOUT_CURRENT_USER:
            return [];

        default:
            return state;
    }
}


export default membershipErrorsReducer;