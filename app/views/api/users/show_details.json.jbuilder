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

json.direct_messages do
    puts "QQQWEOIQJWEOIJQWOIEJQWqqweqwe"
    puts @user.direct_messages_started.length

    @user.direct_messages_started.each do |direct_message|
        json.set! direct_message.id do
            json.partial! "api/direct_messages/direct_message", direct_message: direct_message
        end
    end

    @user.direct_messages_received.each do |direct_message|
        json.set! direct_message.id do
            json.partial! "api/direct_messages/direct_message", direct_message: direct_message
        end
    end
end

json.users do
    @user.users_dmd.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end

    @user.users_dmd_by.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end
end