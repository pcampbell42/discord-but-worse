import { combineReducers } from "redux";

import usersReducer from "../entities_reducers/users_reducer";
import messagesReducer from "../entities_reducers/messages_reducer";
import membershipsReducer from "../entities_reducers/memberships_reducer";
import serversReducer from "../entities_reducers/servers_reducer";
import textChannelsReducer from "../entities_reducers/text_channels_reducer";
import directMessagesReducer from "../entities_reducers/direct_messages_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    memberships: membershipsReducer,
    servers: serversReducer,
    messages: messagesReducer,
    textChannels: textChannelsReducer,
    directMessages: directMessagesReducer
});

export default entitiesReducer;