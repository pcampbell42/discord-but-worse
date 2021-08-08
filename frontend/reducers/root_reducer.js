import { combineReducers } from "redux";
import entitiesReducer from "./top_level_reducers/entities_reducer";
import sessionReducer from "./top_level_reducers/session_reducer";
import errorsReducer from "./top_level_reducers/errors_reducer";

const RootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer
})

export default RootReducer;