import React from "react";
import { ProtectedRoute } from "../../util/route_util.jsx";

import HomePageContainer from "../app/home_page/home_page_container";
import ServerSidebarContainer from "../app/server_sidebar/server_sidebar_container";
import ConversationSidebarContainer from "../app/conversation_sidebar/conversation_sidebar_container";
import ChatRoomContainer from "../app/messages/chat_room_container";
import ProfileNavbarContainer from "../app/profile_navbar/profile_navbar_container";
import ServerShowContainer from "../app/server_show/server_show_container";

import { createSubscription } from "../../util/websockets_helpers";


class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }


    componentDidMount() {

        // ---------------------- Grab everything from backend ----------------------
        this.props.fetchCurrentUserDetails(this.props.currentUser.id)


        //  ---------------------- Set up subscriptions ----------------------
            .then(() => {
                for (const i in this.props.textChannels) {
                    createSubscription("tc", this.props.textChannels[i].id,
                        this.props.receiveAllMessages,
                        this.props.receiveMessage,
                        this.props.deleteMessage
                    );
                }

                for (const i in this.props.directMessages) {
                    createSubscription("dm", this.props.directMessages[i].id,
                        this.props.receiveAllMessages,
                        this.props.receiveMessage,
                        this.props.deleteMessage
                    );
                }
            })

        // ---------------------- Set timeout for loading screen end ----------------------
        setTimeout(() => this.setState({ loading: false }), 3000);
    }

    
    render() {
        return (
            this.state.loading ?

                <div className="loading-background">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <div className="loading-message"></div>
                    </div>
                </div> :

                <div>
                    <div className="app-container">
                        <ProtectedRoute path="/app" component={ProfileNavbarContainer} />
                        <ProtectedRoute path="/app" component={ServerSidebarContainer} />
                        <ProtectedRoute path="/app/home" component={ConversationSidebarContainer} />

                        <ProtectedRoute exact path="/app/home" component={HomePageContainer} />
                        <ProtectedRoute path="/app/home/conversations/:conversationId" component={ChatRoomContainer} />
                        <ProtectedRoute path="/app/servers/:serverId/:textChannelId" component={ServerShowContainer} />
                    </div>
                </div>
        );
    }
}


export default Loading;
