json.server do
    json.partial! "api/servers/server", server: @server
end

json.membership do
    json.partial! "api/memberships/membership", membership: @membership
end