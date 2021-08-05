
export const fetchAllServers = () => (
    $.ajax({
        method: "GET",
        url: "api/servers"
    })
);

export const createServer = server => (
    $.ajax({
        method: "POST",
        url: "api/servers",
        data: { server }
    })
);

export const updateServer = server => (
    $.ajax({
        method: "PATCH",
        url: `/api/servers/${server.id}`,
        data: { server }
    })
);

export const deleteServer = serverId => (
    $.ajax({
        method: "DELETE",
        url: `/api/servers/${serverId}`
    })
);

// export const fetchCurrentServerDetails --> For clicking on a server...
