
export const fetchAllServers = () => (
    $.ajax({
        method: "GET",
        url: "api/servers"
    })
);

export const createServer = formData => (
    $.ajax({
        method: "POST",
        url: "api/servers",
        data: formData,
        contentType: false,
        processData: false
    })
);

export const updateServer = formData => (
    $.ajax({
        method: "PATCH",
        url: `/api/servers/${formData.get("id")}`,
        data: formData,
        contentType: false,
        processData: false
    })
);

export const deleteServer = serverId => (
    $.ajax({
        method: "DELETE",
        url: `/api/servers/${serverId}`
    })
);

export const fetchCurrentServerDetails = serverId => (
    $.ajax({
        method: "GET",
        url: `/api/servers/${serverId}`
    })
);
