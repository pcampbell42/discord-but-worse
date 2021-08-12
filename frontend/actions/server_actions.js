import * as ServerAPIUtil from "../util/server_api_util";
import { receiveMembershipError } from "./membership_actions";

export const RECEIVE_ALL_SERVERS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_UPDATED_SERVER = "RECEIVE_UPDATED_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const RECEIVE_SERVER_DETAILS = "RECEIVE_SERVER_DETAILS";

const receiveAllServers = servers => ({
    type: RECEIVE_ALL_SERVERS,
    servers
});

const receiveServer = data => ({
    type: RECEIVE_SERVER,
    data
});

const receiveUpdatedServer = server => ({
    type: RECEIVE_UPDATED_SERVER,
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
    .then(data => dispatch(receiveServer(data)),
        err => dispatch(receiveMembershipError(err.responseJSON)));

export const updateServer = formServer => dispatch => ServerAPIUtil.updateServer(formServer)
    .then(server => dispatch(receiveUpdatedServer(server)));

export const deleteServer = serverId => dispatch => ServerAPIUtil.deleteServer(serverId)
    .then(() => dispatch(removeServer(serverId)));

export const currentServerDetails = serverId => dispatch => ServerAPIUtil.fetchCurrentServerDetails(serverId)
    .then(details => dispatch(receiveServerDetails(details)));