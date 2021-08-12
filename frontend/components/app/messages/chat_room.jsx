import React from "react";
import Message from "./message";
import MessageFormContainer from "./message_form_container";


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidUpdate() {
        const chatRoomUl = document.getElementById("chat-room-ul");
        chatRoomUl ? chatRoomUl.scrollTop = chatRoomUl.scrollHeight : null;
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
            chatRoomObj !== undefined ?
                <div className="chat-room-container" id={chatRoomType === "dm" ? "dm" : null}>
                    <div className="chat-room-header">
                        <h1>{chatRoomType === "tc" ? "#" : "@"}</h1>
                        <h2>
                            {chatRoomType === "tc" ? chatRoomObj.name : dmdUser.username}
                        </h2>
                    </div>
                    <div className="chat-room-sub-container">
                        <article>
                            <ul id="chat-room-ul">
                                {messages.map(message => (
                                    <Message key={message.id} message={message} currentUser={currentUser} users={users}/>
                                ))}
                            </ul>
                        </article>
                        <MessageFormContainer />
                    </div>
                </div> :
                <div className="empty-chat-room-container">
                    <div className="empty-chat-room-header"></div>
                </div>
        );
    }
}

export default ChatRoom;