import React from "react";
import Message from "./message";
import MessageForm from "./message_form";


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const { currentUser, messages, users, chatRoomType, chatRoomObj } = this.props

        let dmdUser;
        if (chatRoomType === "dm") {
            chatRoomObj.user1Id === currentUser.id ? 
                dmdUser = users[chatRoomObj.user2Id] :
                dmdUser = users[chatRoomObj.user1Id]
        }

        return (
            <div className="chat-room-container" id={chatRoomType === "dm" ? "dm" : null}>
                <div className="chat-room-header">
                    <h1>{chatRoomType === "tc" ? "#" : "@"}</h1>
                    <h2>
                        {chatRoomType === "tc" ? chatRoomObj.name : dmdUser.username}
                    </h2>
                </div>
                <div className="chat-room-sub-container">
                    <ul>
                        {messages.map(message => (
                            <Message key={message.id} message={message} currentUser={currentUser} users={users}/>
                        ))}
                    </ul>
                    
                    <MessageForm currentUser={currentUser} />
                </div>
            </div>
        );
    }
}

export default ChatRoom;