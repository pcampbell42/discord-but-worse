import React from "react";
import defaultProfilePicture from "../../../../app/assets/images/default_profile_picture.png";
import editIcon from "../../../../app/assets/images/edit_icon.png";
import deleteIcon from "../../../../app/assets/images/delete_icon.png";
import { findCurrentSubscription } from "../../../util/websockets_helpers";


class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: { body: props.message.body },
            editing: false,
            hovered: false,
            edited: (props.message.updatedAt === props.message.createdAt ? false : true)
        };

        this.swapToEditing = this.swapToEditing.bind(this);
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, true);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, true);
    }


    handleKeyPress(e) {
        // If ESC is pressed
        if (e.keyCode === 27) {
            e.preventDefault();
            this.setState({ message: { body: this.props.message.body }, editing: false });
        }

        // If enter is pressed
        if (e.keyCode === 13 && document.activeElement === this.editInput) {
            e.preventDefault();
            if (this.state.editing) {
                if (this.state.message.body !== this.props.message.body) {
                    this.handleSubmit(e);
                } else {
                    this.handleClose(e);
                }
            }
        }
    }


    swapToEditing(e) {
        e.preventDefault();
        this.setState({ editing: true });
    }


    update(e) {
        this.setState({ message: { body: e.currentTarget.value }});
    }


    handleSubmit(e) {
        e.preventDefault();

        const messageToSend = Object.assign({}, this.state.message, { id: this.props.message.id });
        const subscriptionNum = findCurrentSubscription();
        App.cable.subscriptions.subscriptions[subscriptionNum].update({ message: messageToSend });

        this.setState({ editing: false, edited: true });
    }


    handleDelete(e) {
        e.preventDefault();

        const subscriptionNum = findCurrentSubscription();
        App.cable.subscriptions.subscriptions[subscriptionNum].destroy({ id: this.props.message.id });

        this.setState({ editing: false });
    }


    handleClose(e) {
        e.preventDefault();
        this.setState({ message: { body: this.props.message.body }, editing: false });
    }

    
    render() {
        const { message, currentUser, users } = this.props;

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

        const editAndDeleteButtons = (
            <div className="chatroom-message-hover-relative-position-anchor">
                <div className="message-hover-container">
                    {this.state.editing ? null :
                        <div className="cr-edit-icon"><img src={editIcon} onClick={this.swapToEditing} /></div>}

                    <div><img src={deleteIcon} onClick={this.handleDelete} /></div>
                </div>
            </div>
        );

        let messageDateArray = message.createdAt.split("T")[0].split("-"); // year, day, month
        let dateToShow = `${messageDateArray[1]}/${messageDateArray[2]}/${messageDateArray[0]}`;

        return (
            users[message.authorId] ? 
                <li key={message.id} className={this.state.editing ? "editing" : null}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}>

                    {currentUser.id === message.authorId && this.state.hovered && !this.state.editing ? editAndDeleteButtons : null}

                    <img src={users[message.authorId].photoUrl === "noPhoto" ? defaultProfilePicture : users[message.authorId].photoUrl}/>

                    <div>
                        <div>
                            {users[message.authorId] ? <h1>{users[message.authorId].username}</h1> : null}
                            <h3>{dateToShow}</h3>
                        </div>
                        {this.state.editing ? editingView : message.body}
                        {!this.state.editing && this.state.edited ? <sub>(edited)</sub> : null}
                    </div>
                </li> : null
        );
    }
}

export default Message;