json.server do
    json.partial! "api/servers/server", server: @server
end

json.membership do
    json.partial! "api/memberships/membership", membership: @membership
end

json.text_channel do
    json.partial! "api/text_channels/text_channel", text_channel: @text_channel
end