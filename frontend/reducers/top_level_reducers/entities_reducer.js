import { combineReducers } from "redux";

import usersReducer from "../entities_reducers/users_reducer";
import messagesReducer from "../entities_reducers/messages_reducer";
import membershipsReducer from "../entities_reducers/memberships_reducer";
import serversReducer from "../entities_reducers/servers_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    memberships: membershipsReducer,
    servers: serversReducer,
    messages: messagesReducer
});

export default entitiesReducer;