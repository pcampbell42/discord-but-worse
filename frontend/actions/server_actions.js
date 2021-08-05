import * as ServerAPIUtil from "../util/message_api_util";

export const RECEIVE_ALL_SERVERS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const RECEIVE_SERVER_DETAILS = "RECEIVE_SERVER_DETAILS";

const receiveAllServers = servers => ({
    type: RECEIVE_ALL_SERVERS,
    servers
});

const receiveServer = server => ({
    type: RECEIVE_SERVER,
    server
});

const removeServer = serverId => ({
    type: REMOVE_SERVER,
    serverId
});

const receiveServerDetails = details => ({
    type: RECEIVE_SERVER_DETAILS,
    details
});

export const fetchAllServers = () => dispatch => ServerAPIUtil.fetchAllServers()
    .then(servers => dispatch(receiveAllServers(servers)));

export const createServer = formServer => dispatch => ServerAPIUtil.createServer(formServer)
    .then(server => dispatch(receiveServer(server)));

export const updateServer = formServer => dispatch => ServerAPIUtil.updateServer(formServer)
    .then(server => dispatch(receiveServer(server)));

export const deleteServer = serverId => dispatch => ServerAPIUtil.deleteServer(serverId)
    .then(() => dispatch(removeServer(serverId)));

// export const fetchServerDetails = serverId => dispatch => ... for when you click on a server (uses receiveServer Details action on line 23)