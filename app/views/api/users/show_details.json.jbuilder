
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

#eventually will grab conversations here as well