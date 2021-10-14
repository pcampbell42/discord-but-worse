class UserChannel < ApplicationCable::Channel
    def subscribed
        stream_for "user_channel_#{params["user_id"]}"
    end

    def create_dm(data)
        dm = new DirectMessage(
            user1_id: params["user_id"],
            user2_id: data["dm"]["user_id"]
        )

        if dm.save

        end
    end
end