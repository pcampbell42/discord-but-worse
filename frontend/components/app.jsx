import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util.jsx";

import EntryPageContainer from "./entry_point/entry_page/entry_page_container";
import SignupFormContainer from "./entry_point/session_form/signup_form_container";
import LoginFormContainer from "./entry_point/session_form/login_form_container";
import HomePageContainer from "./app/home_page/home_page_container";
import ServerSidebarContainer from "./app/server_sidebar/server_sidebar_container";
import ConversationSidebarContainer from "./app/conversation_sidebar/conversation_sidebar_container";
import ProfileNavbarContainer from "./app/profile_navbar/profile_navbar_container";
import ServerShowContainer from "./app/server_show/server_show_container";

const App = () => (
    <div>
        <Route exact path="/" component={EntryPageContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />

        <div className="app-container">
            <ProtectedRoute path="/app" component={ProfileNavbarContainer} />
            <ProtectedRoute path="/app" component={ServerSidebarContainer} />
            <ProtectedRoute path="/app/home" component={ConversationSidebarContainer} />

            <ProtectedRoute exact path="/app/home" component={HomePageContainer} />
            {/* <ProtectedRoute path="/app/home/conversations/:conversationId" component={ConvsationShowContainer} /> */}
            <ProtectedRoute path="/app/servers/:serverId/:textChannelId" component={ServerShowContainer} />

        </div>
    </div>
);

export default App;