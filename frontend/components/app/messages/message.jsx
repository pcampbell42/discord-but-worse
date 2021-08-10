import React from "react";
import defaultProfilePicture from "../../../../app/assets/images/default_profile_picture.png";
import editIcon from "../../../../app/assets/images/edit_icon.png";
import deleteIcon from "../../../../app/assets/images/delete_icon.png";


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                body: props.message.body
            },
            editing: false,
            hovered: false
        };

        this.swapToEditing = this.swapToEditing.bind(this);
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
        App.cable.subscriptions.subscriptions[0].update({ message: messageToSend });
        this.setState({ editing: false });
    }

    handleDelete(e) {
        e.preventDefault();
        App.cable.subscriptions.subscriptions[0].destroy({ id: this.props.message.id });
        this.setState({ editing: false });
    }

    render() {
        const { message, currentUser } = this.props;

        const editingView = (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.message.body} onChange={this.update} />
            </form>
        );

        const editAndDeleteButtons = (
            <div className="chatroom-message-hover-relative-position-anchor">
                <div className="message-hover-container">
                    {this.state.editing ? null :
                        <div><img src={editIcon} onClick={this.swapToEditing} /></div>}

                    <div><img src={deleteIcon} onClick={this.handleDelete} /></div>
                </div>
            </div>
        );

        return(
            <li key={message.id}
                onMouseEnter={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}>

                {currentUser.id === message.authorId && this.state.hovered && !this.state.editing ? editAndDeleteButtons : null}

                <img src={defaultProfilePicture}/>

                <div>
                    <div>
                        <h1>{message.authorId}</h1>
                        <h3>{message.createdAt}</h3>
                    </div>
                    {this.state.editing ? editingView : message.body}
                </div>

            </li>
        );
    }
}

export default Message;