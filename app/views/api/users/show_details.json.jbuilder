
json.memberships do
    @user.memberships.each do |membership|
        json.set! membership.id do
            json.partial! "api/memberships/membership", membership: membership
        end
    end
end

json.servers do
    @user.joined_servers.each do |server|
        json.set! server.id do
            json.partial! "api/servers/server", server: server
        end
    end
end

json.text_channels do
    @user.joined_servers.each do |server|
        server.text_channels.each do |text_channel|
            json.set! text_channel.id do
                json.partial! "api/text_channels/text_channel", text_channel: text_channel
            end
        end
    end
end

# eventually will grab conversations here as well
# ... and users in these conversations