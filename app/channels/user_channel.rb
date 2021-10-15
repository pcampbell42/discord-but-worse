class UserChannel < ApplicationCable::Channel

    def subscribed
        stream_for "user_channel_#{params["user_id"]}"
    end


    def createDM(data)
        dm = DirectMessage.new(
            user1_id: params["user_id"],
            user2_id: data["dm"]["current_user_id"]
        )

        if dm.save
            user = User.find_by(id: data["dm"]["current_user_id"])
            socket = { type: "createDM", user: create_return_user(user), directMessage: create_return_dm(dm) }
            UserChannel.broadcast_to("user_channel_#{params["user_id"]}", socket)
        end
    end

    
    private
    # Converting to camel case...
    def create_return_dm(dm)
        {
            id: dm.id,
            user1Id: dm.user1_id,
            user2Id: dm.user2_id
        }
    end


    def create_return_user(user)
        {
            id: user.id,
            username: user.username,
            usernameId: user.username_id,
            email: user.email,
            photoUrl: (user.photo.attached? ? 
                        Rails.application.routes.url_helpers.rails_blob_path(user.photo, only_path: true)
                            : "noPhoto")
        }
    end

end