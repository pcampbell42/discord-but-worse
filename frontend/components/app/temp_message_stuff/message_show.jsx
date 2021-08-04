import React from "react";

class MessageShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                body: props.message.body,
                // authorId: props.message.authorId
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
        this.setState({ message: { 
            id: this.props.message.id,
            body: e.currentTarget.value 
        }});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateMessage(this.state.message)
        this.setState({ editing: false });
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.removeMessage(this.props.message.id);
        this.setState({ editing: false });
    }

    render() {
        const { message, currentUserId } = this.props

        const editingView = <input type="text" value={this.state.message.body} onChange={this.update} />

        const editAndDeleteButtons = (
            <span>
                {this.state.editing ?
                    <button onClick={this.handleSubmit}>send</button> :
                    <button onClick={this.swapToEditing}>edit</button>}

                <button onClick={this.handleDelete}>delete</button>
            </span>
        );


        return (
            <li key={message.id}>
                {message.authorId}: {this.state.editing ? editingView : message.body}

                {currentUserId === message.authorId ? editAndDeleteButtons : null}
            </li>
        );
    }
}

export default MessageShow;