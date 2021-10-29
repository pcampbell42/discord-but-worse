import React from "react";
import { findCurrentSubscription } from "../../../util/websockets_helpers";


class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { body: "" };
        
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    update(e) {
        this.setState({ body: e.currentTarget.value });
    }


    handleSubmit(e) {
        e.preventDefault();

        const messageToSend = Object.assign({}, this.state, { author_id: this.props.currentUser.id });
        const subscriptionNum = findCurrentSubscription();

        App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });
        this.setState({ body: "" });
    }

    
    render() {
        const { chatRoomType, chatRoomObj, users, currentUser } = this.props

        
        // --------------- Finding placeholder for message input ---------------

        let placeholder;
        if (chatRoomType === "dm") {
            let dmdUser;

            if (chatRoomObj.user1Id === currentUser.id ) {
                dmdUser = users[chatRoomObj.user2Id]
            } else {
                dmdUser = users[chatRoomObj.user1Id]
            }

            placeholder = `Message @${dmdUser.username}`
        } else {
            placeholder = `Message #${chatRoomObj.name}`
        }

        return (
                <form onSubmit={this.handleSubmit}>
                    <input className="cr-message-form-input" type="text" value={this.state.body} 
                        onChange={this.update} placeholder={placeholder} />
                </form>
        );
    }
}


export default MessageForm;