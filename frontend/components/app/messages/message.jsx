import React from "react";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                body: props.message.body
            },
            editing: false
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

        const editingView = <input type="text" value={this.state.message.body} onChange={this.update} />

        const editAndDeleteButtons = (
            <span>
                {this.state.editing ?
                    <button onClick={this.handleSubmit}>send</button> :
                    <button onClick={this.swapToEditing}>edit</button>}

                <button onClick={this.handleDelete}>delete</button>
            </span>
        );

        return(
            <li key={message.id}>
                {message.authorId}: {this.state.editing ? editingView : message.body}

                {currentUser.id === message.authorId ? editAndDeleteButtons : null}
            </li>
        );
    }
}

export default Message;