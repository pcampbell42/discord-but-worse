class ChatChannel < ApplicationCable::Channel

    def subscribed
        stream_for "chat_channel"
    end


    def create(data)
        message = Message.new(
            body: data["message"]["body"],
            author_id: data["message"]["author_id"]
        )

        if message.save
            socket = create_message_socket(message, "create")
            ChatChannel.broadcast_to("chat_channel", socket)
        end
    end


    def update(data)
        message = Message.find_by(id: data["message"]["id"])

        if message.update(body: data["message"]["body"])
            socket = create_message_socket(message, "update")
            ChatChannel.broadcast_to("chat_channel", socket)
        end
    end


    def destroy(data)
        message = Message.find_by(id: data["id"])
        message.destroy
        ChatChannel.broadcast_to("chat_channel", { type: "destroy", messageId: data["id"] })
    end


    def unsubscribed; end

    
    private
    def create_message_socket(message, type)
        {
            type: type, 
            message: {
                id: message.id,
                body: message.body,
                authorId: message.author_id,
                messageableType: message.messageable_type,
                messageableId: message.messageable_id
            }
        }
    end

end
