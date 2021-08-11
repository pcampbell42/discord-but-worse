import React from "react";
import { ProtectedRoute } from "../../util/route_util.jsx";

import HomePageContainer from "../app/home_page/home_page_container";
import ServerSidebarContainer from "../app/server_sidebar/server_sidebar_container";
import ConversationSidebarContainer from "../app/conversation_sidebar/conversation_sidebar_container";
import ChatRoomContainer from "../app/messages/chat_room_container";
import ProfileNavbarContainer from "../app/profile_navbar/profile_navbar_container";
import ServerShowContainer from "../app/server_show/server_show_container";


class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.props.fetchCurrentUserDetails(this.props.currentUser.id);
    }

    
    render() {
        return (
            Object.keys(this.props.textChannels).length !== 0 ? 
                <div>
                    <div className="app-container">
                        <ProtectedRoute path="/app" component={ProfileNavbarContainer} />
                        <ProtectedRoute path="/app" component={ServerSidebarContainer} />
                        <ProtectedRoute path="/app/home" component={ConversationSidebarContainer} />

                        <ProtectedRoute exact path="/app/home" component={HomePageContainer} />
                        <ProtectedRoute path="/app/home/conversations/:conversationId" component={ChatRoomContainer} />
                        <ProtectedRoute path="/app/servers/:serverId/:textChannelId" component={ServerShowContainer} />

                    </div>
                </div> :
                <div className="loading">Bet you can't see me :)</div>
        );
    }
}


export default Loading;