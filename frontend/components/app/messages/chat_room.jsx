import React from "react";
import MessageContainer from "./message_container";
import MessageFormContainer from "./message_form_container";
import { isChildMessage, getDateToShow } from "../../../util/helpers";
import sadge from "../../../../app/assets/images/sadge.png";
import pinIcon from "../../../../app/assets/images/pin_icon.png";


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinnedHovered: false,
            showPinned: false
        };
    }


    componentDidUpdate() {
        const chatRoomUl = document.getElementById("chat-room-ul");
        chatRoomUl ? chatRoomUl.scrollTop = chatRoomUl.scrollHeight : null;
    }


    render() {
        const { pinnedHovered, showPinned } = this.state;
        const { currentUser, messages, users, chatRoomType, chatRoomObj, usersHidden } = this.props


        const pinnedMessages = (users[message.authorId] ? 
            <div className="pinned-messages-display-anchor">
                <div className="pinned-messages-display">
                    <h2 className="pinned-messages-header">Pinned Messages</h2>

                    <ul className="pinned-messages-list">
                        {messages.map(message => 
                            <li className="pinned-message">
                                <img className="pinned-message-profile-pic" src={users[message.authorId].photoUrl === "noPhoto" ? 
                                    defaultProfilePicture : users[message.authorId].photoUrl} />

                                <div className="pinned-message-container">
                                    <h3 className="pinned-message-user-name">{users[message.authorId].username}</h3>
                                    <h4 className="pinned-message-date">{getDateToShow(message.updatedAt)}</h4>
                                    <p className="pinned-message-body">{message.body}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div> : null
        );


        const pinnedMessagesTooltip = (
            <div className="pinned-messages-tooltip-anchor">
                <div className="pinned-messages-tooltip">Pinned Messages</div>
                <div className="pinned-messages-tooltip-arrow-up"></div>
            </div>
        );


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
                    {showPinned ? pinnedMessages : null}

                    <div className="chat-room-header">
                        <h1>{chatRoomType === "tc" ? "#" : "@"}</h1>
                        <h2>
                            {chatRoomType === "tc" ? chatRoomObj.name : dmdUser.username}
                        </h2>
                        <img src={pinIcon} className="chat-room-pinned-button" id={showPinned ? "crpb-selected" : null}
                            onClick={() => this.setState({ showPinned: true })}
                            onMouseEnter={() => this.setState({ pinnedHovered: true })}
                            onMouseLeave={() => this.setState({ pinnedHovered: false })} />

                        {pinnedHovered && !showPinned ? pinnedMessagesTooltip : null}
                    </div>

                    <div className="chat-room-sub-container">
                        <article>
                            <ul id="chat-room-ul">
                                {messages.map(message => {
                                    // If message isn't a child message of the current parentMessage
                                    if (!isChildMessage(message, parentMessage)) parentMessage = message;

                                    return <MessageContainer key={message.id} message={message} currentUser={currentUser} 
                                                user={users[message.authorId]} users={users}
                                                isParent={parentMessage === message ? true : false} />
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