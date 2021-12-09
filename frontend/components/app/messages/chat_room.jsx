import React from "react";
import MessageContainer from "./message_container";
import MessageFormContainer from "./message_form_container";
import { isChildMessage, getDateToShow, hasPinnedMessages } from "../../../util/helpers";
import sadge from "../../../../app/assets/images/sadge.png";
import pinIcon from "../../../../app/assets/images/pin_icon.png";
import noPinnedMessagesDisplay from "../../../../app/assets/images/no_pinned_messages.png"


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinnedHovered: false,
            showPinned: false,

            // Used to display x remove button in pinned messages display
            showRemovePinnedX: false,
            hoveredMessageId: false
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }


    // --------------- Deals with scrolling ---------------

    componentDidUpdate() {
        const chatRoomUl = document.getElementById("chat-room-ul");
        chatRoomUl ? chatRoomUl.scrollTop = chatRoomUl.scrollHeight : null;
    }


    // --------------- Event listeners for closing pinned messages ---------------

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, true);
        document.addEventListener("click", this.handleOutsideClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, true);
        document.removeEventListener("click", this.handleOutsideClick, true);
    }


    // --------------- Event handlers for closing pinned messages ---------------

    handleKeyPress(e) {
        if (e.keyCode === 27) this.setState({ showPinned: false });
    }

    handleOutsideClick(e) {
        if (this.pinnedMessages) {
            if (!this.pinnedMessages.contains(e.target) && !this.pinnedToggle.contains(e.target)) {
                this.setState({ showPinned: false });
            }
        }
    }


    render() {
        const { pinnedHovered, showPinned, showRemovePinnedX, hoveredMessageId } = this.state;
        const { currentUser, messages, users, chatRoomType, chatRoomObj, usersHidden } = this.props


        // Quick check if there are any pinned messages, used in pinnedMessages display below
        const hasPinned = hasPinnedMessages(messages);

        const pinnedMessages = (users ? 
            <div className="pinned-messages-display-anchor">
                <div className="pinned-messages-display" ref={pinnedMessages => this.pinnedMessages = pinnedMessages}>
                    <h2 className="pinned-messages-header">Pinned Messages</h2>

                    {hasPinned ? 
                        <ul className="pinned-messages-list">
                            {messages.map(message => message.pinned ?
                                <li className="pinned-message" key={message.id} 
                                    onMouseEnter={() => this.setState({ showRemovePinnedX: true, hoveredMessageId: message.id })}
                                    onMouseLeave={() => this.setState({ showRemovePinnedX: false, hoveredMessageId: null })}>

                                    {showRemovePinnedX && hoveredMessageId === message.id ? 
                                        <div className="pinned-message-remove-x-anchor">
                                            <button className="pinned-message-remove-x">x</button>
                                        </div> : null}

                                    <img className="pinned-message-profile-pic" src={users[message.authorId].photoUrl === "noPhoto" ? 
                                        defaultProfilePicture : users[message.authorId].photoUrl} />

                                    <div className="pinned-message-container">
                                        <div className="pinned-message-username-date-header">
                                            <h3 className="pinned-message-username">{users[message.authorId].username}</h3>
                                            <h4 className="pinned-message-date">{getDateToShow(message.updatedAt)}</h4>
                                        </div>
                                        <p className="pinned-message-body">{message.body}</p>
                                    </div>
                                </li> : null
                            )}
                        </ul>
                            :
                        <div className="no-pinned-messages-display">
                            <img className="no-pinned-messages-image" src={noPinnedMessagesDisplay} />
                        </div>
                    }
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
                            ref={pinnedToggle => this.pinnedToggle = pinnedToggle}
                            onClick={() => this.setState({ showPinned: showPinned ? false : true })}
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