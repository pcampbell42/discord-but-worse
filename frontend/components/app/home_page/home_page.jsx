import React from "react";
// import MessageIndexContainer from "../temp_message_stuff/message_index_container";
import ChatRoomContainer from "../messages/chat_room_container";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>You are inside the app</h1>
                {/* <MessageIndexContainer /> */}
                <ChatRoomContainer />
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default HomePage;