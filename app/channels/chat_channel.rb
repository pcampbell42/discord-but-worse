class ChatChannel < ApplicationCable::Channel

    def subscribed
        stream_for "chat_channel_#{params["thread_type"]}_#{params["thread_id"]}"
        self.load
    end


    def load
        thread_type = params["thread_type"] === "tc" ? "TextChannel" : "DirectMessage"
        messages = Message.where(
            messageable_type: thread_type,
            messageable_id: params["thread_id"]
        )

        messages_hash = {}
        messages.each do |message|
            messages_hash[message.id] = create_return_message(message)
        end

        socket = { type: "index", messages: messages_hash }
        ChatChannel.broadcast_to("chat_channel_#{params["thread_type"]}_#{params["thread_id"]}", socket)
    end


    def create(data)
        message = Message.new(
            body: data["message"]["body"],
            author_id: data["message"]["author_id"],
            messageable_id: params["thread_id"],
            messageable_type: (params["thread_type"] == "tc" ? "TextChannel" : "DirectMessage")
        )

        if message.save
            socket = { type: "create", message: create_return_message(message) }
            ChatChannel.broadcast_to("chat_channel_#{params["thread_type"]}_#{params["thread_id"]}", socket)
        end
    end


    def update(data)
        message = Message.find_by(id: data["message"]["id"])

        # The message has been pinned / unpinned, so we don't want to update the updated_at 
        # column (this would mess with how we display (edited) on the frontend)
        if message["pinned"] != data["message"]["pinned"]
            if message.update_columns(pinned: data["message"]["pinned"])
                socket = { type: "update", message: create_return_message(message) }
                ChatChannel.broadcast_to("chat_channel_#{params["thread_type"]}_#{params["thread_id"]}", socket)
            end
        
        # Normal update (aka, the body of the message has been updated)
        elsif message.update(body: data["message"]["body"], pinned: data["message"]["pinned"])
            socket = { type: "update", message: create_return_message(message) }
            ChatChannel.broadcast_to("chat_channel_#{params["thread_type"]}_#{params["thread_id"]}", socket)
        end
    end


    def destroy(data)
        message = Message.find_by(id: data["id"])
        message.destroy
        ChatChannel.broadcast_to("chat_channel_#{params["thread_type"]}_#{params["thread_id"]}", { type: "destroy", messageId: data["id"] })
    end


    def unsubscribed; end

    
    private
    # Converting to camel case...
    def create_return_message(message)
        {
            id: message.id,
            body: message.body,
            authorId: message.author_id,
            messageableType: message.messageable_type,
            messageableId: message.messageable_id,
            pinned: message.pinned,
            createdAt: message.created_at,
            updatedAt: message.updated_at
        }
    end

end
