import React from "react";
import TextChannelSidebarContainer from "./text_channel_sidebar/text_channel_sidebar_container";
import ChatRoomContainer from "../messages/chat_room_container"
import UserSidebarContainer from "./user_sidebar_container";

class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.currentServerDetails(this.props.match.params.serverId);
    }

    render() {
        return (
            <div className="server-show-container">
                <TextChannelSidebarContainer serverId={this.props.match.params.serverId} channelId={this.props.match.params.textChannelId} />
                <ChatRoomContainer serverId={this.props.match.params.serverId} channelId={this.props.match.params.textChannelId} />
                <UserSidebarContainer serverId={this.props.match.params.serverId} channelId={this.props.match.params.textChannelId} />
            </div>
        );
    }
}

export default ServerShow;