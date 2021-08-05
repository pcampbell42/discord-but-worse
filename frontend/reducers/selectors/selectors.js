
export const currentUserServers = state => {
    const currentUserId = state.session.id;

    const memberships = state.entities.memberships;
    let joinedServerIds = [];

    for (const i in memberships) {
        if (currentUserId === memberships[i].userId) {
            joinedServerIds.push(memberships[i].serverId);
        }
    }

    const servers = state.entities.servers;
    let joinedServers = [];

    for (const i in servers) {
        if (joinedServerIds.includes(servers[i].id)) {
            joinedServers.push(servers[i]);
        }
    }

    return joinedServers;
}