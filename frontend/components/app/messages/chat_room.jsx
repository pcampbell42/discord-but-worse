import React from "react";
import MessageContainer from "./message_container";
import MessageFormContainer from "./message_form_container";
import { isChildMessage } from "../../../util/helpers";
import sadge from "../../../../app/assets/images/sadge.png";


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
        const { currentUser, messages, users, chatRoomType, chatRoomObj, usersHidden } = this.props

        let dmdUser;
        if (chatRoomType === "dm") {
            chatRoomObj.user1Id === currentUser.id ? 
                dmdUser = users[chatRoomObj.user2Id] :
                dmdUser = users[chatRoomObj.user1Id]
        }

        // Used for grouping messages based on date / user
        let parentMessage = messages[0];

        return (
            chatRoomObj !== undefined ?
                <div className="chat-room-container" id={chatRoomType === "dm" || usersHidden ? "dm" : null}>
                    <div className="chat-room-header">
                        <h1>{chatRoomType === "tc" ? "#" : "@"}</h1>
                        <h2>
                            {chatRoomType === "tc" ? chatRoomObj.name : dmdUser.username}
                        </h2>
                    </div>
                    <div className="chat-room-sub-container">
                        <article>
                            <ul id="chat-room-ul">
                                {messages.map((message, idx) => {
                                    // If message isn't a child message of the current parentMessage
                                    if (!isChildMessage(message, parentMessage)) parentMessage = message;

                                    return <MessageContainer key={message.id} message={message} currentUser={currentUser} 
                                                users={users} isParent={parentMessage === message ? true : false} />
                                })}
                            </ul>
                        </article>
                        <MessageFormContainer />
                    </div>
                </div> :
                <div className="empty-chat-room-container">
                    <div className="empty-chat-room-header"></div>
                    <div className="empty-chat-room-sub-container">
                        <img className="empty-chat-room-img" src={sadge}/>
                    </div>
                </div>
        );
    }
}

export default ChatRoom;