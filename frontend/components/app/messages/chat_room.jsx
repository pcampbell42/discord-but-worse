import React from "react";
import Message from "./message";
import MessageForm from "./message_form";

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        App.cable.subscriptions.create(
            { channel: "ChatChannel" },
            {
                received: data => {
                    switch(data.type) {
                        case "create":
                            this.props.receiveMessage(data.message);
                            break;

                        case "update":
                            this.props.receiveMessage(data.message);
                            break;

                        case "destroy":
                            this.props.deleteMessage(data.messageId);
                            break;

                        default:
                            break;
                    }
                },
                create: function(data) { return this.perform("create", data) },
                update: function(data) { return this.perform("update", data) },
                destroy: function(data) { return this.perform("destroy", data) }
            }
        );

        this.props.fetchAllMessages();
    }

    render() {
        const { currentUser, messages } = this.props

        return (
            <div className="chat-room-container">
                <div className="chat-room-header">
                    <h1>hello</h1>
                </div>
                <div className="chat-room-sub-container">
                    <ul>
                        {messages.map(message => (
                            <Message key={message.id} message={message} currentUser={currentUser} />
                        ))}
                    </ul>
                    
                    <MessageForm currentUser={currentUser} />
                </div>
            </div>
        );
    }
}

export default ChatRoom;