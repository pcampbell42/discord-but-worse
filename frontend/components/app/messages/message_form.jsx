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
        // ---------------------- Have to get messageable type + id here ----------------------
        const messageToSend = Object.assign({}, this.state, { author_id: this.props.currentUser.id });
        const subscriptionNum = findCurrentSubscription();

        App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });
        this.setState({ body: "" });
    }

    
    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.body} onChange={this.update}
                        placeholder={`Message @ or # user or text channel name`}
                    />
                    {/* <input type="submit" value="post" /> */}
                </form>
        );
    }
}

export default MessageForm;