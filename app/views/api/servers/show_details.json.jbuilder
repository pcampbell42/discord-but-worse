json.server do
    json.partial! "api/servers/server", server: @server
end

json.memberships do
    @server.memberships.each do |membership|
        json.set! membership.id do
            json.partial! "api/memberships/membership", membership: membership
        end
    end
end

json.users do
    @server.members.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end
end

json.text_channels do
    @server.text_channels.each do |text_channel|
        json.set! text_channel.id do
            json.partial! "api/text_channels/text_channel", text_channel: text_channel
        end
    end
end