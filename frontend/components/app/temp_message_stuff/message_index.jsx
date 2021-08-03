import React from "react";

import MessageShow from "./message_show";
import NewMessageFormContainer from "./new_message_form_container";

class MessageIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllMessages();
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.messages.map(message => 
                        <MessageShow key={message.id}
                            currentUserId={this.props.currentUser.id}
                            message={message} 
                            updateMessage={this.props.updateMessage}
                            removeMessage={this.props.removeMessage}
                        />
                    )}
                </ul>

                <NewMessageFormContainer />
            </div>
        );
    }
}

export default MessageIndex;