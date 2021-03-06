import React from "react";
import TextChannelSidebarContainer from "./text_channel_sidebar/text_channel_sidebar_container";
import ChatRoomContainer from "../messages/chat_room_container"
import UserSidebarContainer from "./user_sidebar/user_sidebar_container";
import usersIcon from "./../../../../app/assets/images/users_icon.png";


class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersHidden: false,
            usersToggleHovered: false
        };
    }


    componentDidMount() {
        this.props.currentServerDetails(this.props.match.params.serverId);
    }


    render() {
        const { usersHidden, usersToggleHovered } = this.state;
        const { serverId, textChannelId } = this.props.match.params;
        
        const usersToggleTooltip = (
            <div className="users-toggle-tooltip-anchor">
                <div className="users-toggle-tooltip">
                    {usersHidden ? "Show Member List" : "Hide Member List"}
                </div>
                <div className="users-toggle-tooltip-arrow-up"></div>
            </div>
        );

        return (
            <div className="server-show-container">
                <div className="users-toggle-anchor">
                    {usersToggleHovered ? usersToggleTooltip : null}
                    <img className="users-toggle" src={usersIcon} id={usersHidden ? null : "ut-selected"} 
                        onClick={() => this.setState({ usersHidden: (usersHidden ? false : true) })}
                        onMouseEnter={() => this.setState({ usersToggleHovered: true })}
                        onMouseLeave={() => this.setState({ usersToggleHovered: false })} />
                </div>

                <TextChannelSidebarContainer serverId={serverId} channelId={textChannelId} />

                <ChatRoomContainer serverId={serverId} channelId={textChannelId} usersHidden={usersHidden}/>

                {usersHidden ? null : <UserSidebarContainer serverId={serverId} channelId={textChannelId} />}
            </div>
        );
    }
}


export default ServerShow;