import { combineReducers } from "redux";
import sessionErrorsReducer from "../errors_reducers/session_errors_reducer";
import membershipErrorsReducer from "../errors_reducers/membership_errors_reducer";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    memberships: membershipErrorsReducer
});

export default errorsReducer