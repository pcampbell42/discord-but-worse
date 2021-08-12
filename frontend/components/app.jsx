import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util.jsx";

import EntryPageContainer from "./entry_point/entry_page/entry_page_container";
import SignupFormContainer from "./entry_point/session_form/signup_form_container";
import LoginFormContainer from "./entry_point/session_form/login_form_container";
import LoadingContainer from "./loading/loading_container";


const App = () => (
    <div>
        <Route exact path="/" component={EntryPageContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />

        <ProtectedRoute path="/app" component={LoadingContainer} />
    </div>
)


export default App;