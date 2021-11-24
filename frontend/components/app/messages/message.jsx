import React from "react";
import defaultProfilePicture from "../../../../app/assets/images/default_profile_picture.png";
import editIcon from "../../../../app/assets/images/edit_icon.png";
import pinIcon from "../../../../app/assets/images/pin_icon.png";
import deleteIcon from "../../../../app/assets/images/delete_icon.png";
import moreIcon from "../../../../app/assets/images/more.png";
import { findCurrentSubscription, createUserSubscription, findUserSubscription } from "../../../util/websockets_helpers";
import { getDateToShow, formatReturnTime } from "../../../util/helpers";
import { withRouter } from "react-router";


class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: { body: props.message.body },
            editing: false,
            hovered: false,
            showMessageDropdown: false,
            edited: (props.message.updatedAt === props.message.createdAt ? false : true),

            editHovered: false,
            moreHovered: false,

            showProfile: false,
            body: ""
        };

        this.swapToEditing = this.swapToEditing.bind(this);
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSendMessageFromProfile = this.handleSendMessageFromProfile.bind(this);
        this.updateProfileMessage = this.updateProfileMessage.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handlePin = this.handlePin.bind(this);
    }


    // --------------- Event listeners for message edit shortcuts & clsoing profile display ---------------

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, true);
        document.addEventListener("click", this.handleOutsideClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, true);
        document.removeEventListener("click", this.handleOutsideClick, true);
    }


    // --------------- Event listeners for message edit ---------------

    handleKeyPress(e) {
        // If ESC is pressed
        if (e.keyCode === 27) {
            e.preventDefault();
            this.setState({ message: { body: this.props.message.body }, editing: false, body: "", 
                showProfile: false, showMessageDropdown: false, hovered: false });
        }

        // If enter is pressed and edit message input is focused
        if (e.keyCode === 13 && document.activeElement === this.editInput && !this.showProfile) {
            e.preventDefault();
            if (this.state.editing) {
                if (this.state.message.body !== this.props.message.body) {
                    this.handleSubmit(e);
                } else {
                    this.handleClose(e);
                }
            }
        }

        // If enter key is pressed and user profile is open
        if (e.keyCode === 13 && this.showProfile) {
            e.preventDefault();
            if (this.state.body === "") return
            this.handleSendMessageFromProfile(e);
        }
    }

    swapToEditing(e) {
        e.preventDefault();
        this.setState({ editing: true, showMessageDropdown: false });
    }

    update(e) {
        this.setState({ message: { body: e.currentTarget.value }});
    }

    handleSubmit(e) {
        e.preventDefault();

        const messageToSend = Object.assign({}, this.state.message, { id: this.props.message.id }, { pinned: this.props.message.pinned });
        const subscriptionNum = findCurrentSubscription();
        App.cable.subscriptions.subscriptions[subscriptionNum].update({ message: messageToSend });

        this.setState({ editing: false, edited: true });
    }

    handlePin(e) {
        e.preventDefault();

        const subscriptionNum = findCurrentSubscription();
        App.cable.subscriptions.subscriptions[subscriptionNum].update({ message: { 
            id: this.props.message.id, 
            pinned: this.props.message.pinned ? false : true,
            body: this.props.message.body 
        } });

        this.setState({ showMessageDropdown: false, hovered: false });
    }

    handleClose(e) {
        e.preventDefault();
        this.setState({ message: { body: this.props.message.body }, editing: false });
    }


    // --------------- Event listeners for user profile display ---------------

    handleSendMessageFromProfile(e) {
        e.preventDefault();

        if (this.state.body === "") return;

        // DM already exists, just send message
        if (this.props.dmExists) {
            // Format message
            let messageToSend = Object.assign({}, { body: this.state.body }, { author_id: this.props.currentUser.id });

            // Get DM websocket subscription
            let subscriptionNum = findCurrentSubscription("dm", this.props.dmId);

            // Send Message
            App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });

            // Redirect to DM and close user profile
            if (this.state.body !== "") this.props.history.push(`/app/home/conversations/${this.props.dmId}`);
            this.setState({ showProfile: false, body: "" });
        }

        // DM doesn't exist, so make new DM and send message
        else {
            // Format DM and message
            let dmToCreate = { current_user_id: this.props.currentUser.id };
            let messageToSend = Object.assign({}, { body: this.state.body }, { author_id: this.props.currentUser.id });

            // Subscribe to the target user's UserChannel
            createUserSubscription(this.props.message.authorId, this.props.receiveDirectMessage,
                this.props.receiveUser, this.props.receiveAllMessages, this.props.receiveMessage,
                this.props.deleteMessage);

            // Wait a tiny amount of time to avoid bug where subscription isn't created yet
            setTimeout(() => {
                // Call createDM to target user's UserChannel (Basically tells all subscribers
                // to save this DM to state). Note that this is kind of bug prone (if someone else
                // happens to be subscribed to the channel at the exact same time, they would save
                // this DM to state).
                let userSubscriptionNum = findUserSubscription(this.props.message.authorId);
                App.cable.subscriptions.subscriptions[userSubscriptionNum].createDM({ dm: dmToCreate });

                // Tiny timeout to wait for DM to be made and subscribed to
                setTimeout(() => {
                    // Get DM subscription and send message
                    let subscriptionNum = findCurrentSubscription("dm", this.props.dmId);
                    App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });

                    // Close user profile and redirect to DM
                    this.setState({ showProfile: false, body: "" });
                    this.props.history.push(`/app/home/conversations/${this.props.dmId}`);

                    // Remove user subscription (shouldn't stay subscribed to other user's channel)
                    App.cable.subscriptions.remove(App.cable.subscriptions.subscriptions[userSubscriptionNum]);
                }, 100)
            }, 100);
        }
    }

    updateProfileMessage(e) {
        this.setState({ body: e.currentTarget.value });
    }

    handleOutsideClick(e) {
        if (this.showProfileEl) {
            if (!this.showProfileEl.contains(e.target))
                this.setState({ body: "", showProfile: false });
        }
        
        if (this.optionsDropdown) {
            if (!this.optionsDropdown.contains(e.target))
                this.setState({ showMessageDropdown: false, hovered: false });
        }

    }


    // --------------- Event listeners for other message things ---------------

    handleDelete(e) {
        e.preventDefault();

        const subscriptionNum = findCurrentSubscription();
        App.cable.subscriptions.subscriptions[subscriptionNum].destroy({ id: this.props.message.id });

        this.setState({ editing: false });
    }

    
    render() {
        const { message, currentUser, users, isParent, membership, user } = this.props;
        const { hovered, editing, editHovered, moreHovered, showProfile, showMessageDropdown } = this.state;


        const editingView = (
            <form>
                <input ref={editInput => this.editInput = editInput} type="text" value={this.state.message.body} 
                    onChange={this.update} />
                <p className="message-edit-text">
                    escape to <span className="message-edit-cancel" onClick={this.handleClose}>cancel</span> 
                     • enter to <span className="message-edit-save" onClick={this.handleSubmit}>save</span>
                </p>
            </form>
        );


        const editTooltip = (
            <div className="message-edit-tooltip-relative-position-anchor">
                <div className="message-edit-tooltip" style={this.messagePos ? 
                    this.messagePos.getBoundingClientRect().top < 95 ? { bottom: "-55px" } 
                    : null : null}>Edit</div>

                {this.messagePos ? this.messagePos.getBoundingClientRect().top < 95 ? 
                    <div className="message-edit-arrow-up"></div> : 
                    <div className="message-edit-arrow-down"></div> : null
                }
            </div>
        );


        const moreTooltip = (
            <div className="message-more-tooltip-relative-position-anchor">
                <div className="message-more-tooltip" style={this.messagePos ? 
                    this.messagePos.getBoundingClientRect().top < 95 ? { bottom: "-55px" }
                        : null : null}>More</div>

                {this.messagePos ? this.messagePos.getBoundingClientRect().top < 95 ?
                    <div className="message-more-arrow-up"></div> :
                    <div className="message-more-arrow-down"></div> : null
                }
            </div>
        );


        const messageDropdown = (
            <div className="message-dropdown-relative-position-anchor">
                <div className="message-dropdown-container" ref={optionsDropdown => this.optionsDropdown = optionsDropdown}
                    id={currentUser.id !== message.authorId ? "small-dropdown" : null}>

                    {currentUser.id === message.authorId ?
                        <div className="message-edit-container" onClick={this.swapToEditing}>
                            <h3 className="message-edit-header">Edit Message</h3>
                            <img src={editIcon} className="message-edit-icon" />
                        </div> : null
                    }

                    <div className="message-pin-container" onClick={this.handlePin}>
                        <h3 className="message-pin-header">{message.pinned ? "Unpin Message" : "Pin Message"}</h3>
                        <img src={pinIcon} className="message-pin-icon" />
                    </div>

                    {currentUser.id === message.authorId ?
                        <div className="message-delete-container" onClick={this.handleDelete}>
                            <h3 className="message-delete-header">Delete Message</h3>
                            <img src={deleteIcon} className="message-delete-icon" />
                        </div> : null
                    }
                </div>
            </div>
        );


        const messageHoverOptions = (
            <div className="chatroom-message-hover-relative-position-anchor">
                <div className="message-hover-container" id={currentUser.id !== message.authorId ? "small-hover" : null}
                    style={{
                        top: `${this.messagePos ? this.messagePos.getBoundingClientRect().top - 18 : 0}px`,
                        display: `${this.messagePos ? this.messagePos.getBoundingClientRect().top < 55 ? "none" : null : null}`
                    }}>
                    {!this.state.editing && currentUser.id === message.authorId ?
                        <div className="cr-edit-icon">
                            {editHovered ? editTooltip : null}
                            <img src={editIcon} onClick={this.swapToEditing} 
                                onMouseEnter={() => this.setState({ editHovered: true })}
                                onMouseLeave={() => this.setState({ editHovered: false })} />
                        </div> : null
                    }

                    <div className="message-more-container">
                        {showMessageDropdown ? messageDropdown : null}
                        {moreHovered ? moreTooltip : null}
                        <img src={moreIcon} className="message-more-dots"
                            onClick={() => this.setState({ showMessageDropdown: true })}
                            onMouseEnter={() => this.setState({ moreHovered: true })}
                            onMouseLeave={() => this.setState({ moreHovered: false })} />
                    </div>
                </div>
            </div>
        );


        const childMessageTimeShow = (
            <div className="chatroom-child-message-time-show-relative-position-anchor">
                <span className="child-message-date">{formatReturnTime(message.createdAt)}</span>
            </div>  
        );


        const profileDisplay = (
            users[message.authorId] && (message.messageableType === "DirectMessage" || membership) ?
                <div className="message-relative-position-anchor">
                    <div className="message-profile-display" ref={showProfileEl => this.showProfileEl = showProfileEl}
                        style={{
                            top: `${this.messageSenderName ? (window.innerHeight - this.messageSenderName.getBoundingClientRect().bottom) < 220 ?
                                window.innerHeight - 230 : this.messageSenderName.getBoundingClientRect().bottom - 22 : 0}px`
                        }}>

                        <div className="message-profile-header"></div>
                        <button onClick={() => this.setState({ showProfile: false, body: "" })}>x</button>

                        <img className="message-user-show-profile-pic" src={users[message.authorId].photoUrl === "noPhoto" ? 
                            defaultProfilePicture : users[message.authorId].photoUrl} />

                        <div className="message-user-show-sub-container">
                            <h1 className="message-user-show-username">{membership && membership.nickname !== "" ? membership.nickname : 
                                users[message.authorId].username}</h1>
                            {users[message.authorId].id !== currentUser.id ?
                                <form onSubmit={this.handleSendMessageFromProfile}>
                                    <input className="message-user-show-input" type="text" onChange={this.updateProfileMessage} 
                                        placeholder={`Message @${membership && membership.nickname !== "" ? membership.nickname : 
                                        users[message.authorId].username}`} />
                                </form>
                                :
                                null
                            }
                        </div>

                    </div>
                </div> : null
        );
      
        
        let dateToShow = getDateToShow(message.updatedAt);
        

        return (
            users[message.authorId] && (message.messageableType === "DirectMessage" || membership) ? 
                <li key={message.id} className={editing ? "editing" : null}
                    id={isParent ? null : "child-message"}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => showMessageDropdown ? null : this.setState({ hovered: false })}>

                    {showProfile ? profileDisplay : null}
                    {hovered && !editing ? messageHoverOptions : null}
                    {hovered && !editing && !isParent ? childMessageTimeShow : null}

                    {isParent ? <img src={users[message.authorId].photoUrl === "noPhoto" ? defaultProfilePicture : users[message.authorId].photoUrl} /> 
                        : null}

                    <div className="message-container" ref={messagePos => this.messagePos = messagePos}>
                        <div>
                            {users[message.authorId] && isParent ? 
                                <h1 className="message-sender-name" onClick={() => this.setState({ showProfile: true })}
                                    ref={messageSenderName => this.messageSenderName = messageSenderName}>
                                    {message.messageableType === "TextChannel" && membership.nickname !== "" ? 
                                        membership.nickname : user.username
                                    }
                                </h1> : null
                            }
                            <h3>{isParent ? dateToShow : null}</h3>
                        </div>
                        {editing ? editingView : message.body}
                        {!editing && message.updatedAt !== message.createdAt ? <sub>(edited)</sub> : null}
                    </div>
                </li> : null
        );
    }
}

export default withRouter(Message);