
json.text_channel do
    json.partial! "api/text_channels/text_channel", text_channel: @text_channel
end

json.messages do
    @text_channel.messages.each do |message|
        json.set! message.id do
            json.partial! "api/messages/message", message: message
        end
    end
end
