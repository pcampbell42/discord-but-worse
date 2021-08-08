import { RECEIVE_MEMBERSHIP_ERROR, CLEAR_MEMBERSHIP_ERRORS } from "../../actions/membership_actions";

const membershipErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_MEMBERSHIP_ERROR:
            return action.error;    

        case CLEAR_MEMBERSHIP_ERRORS:
            return [];

        default:
            return state;
    }
}

export default membershipErrorsReducer;