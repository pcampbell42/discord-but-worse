import React from "react";
import { Link } from "react-router-dom";
import EntryHeader from "../entry_header";

const EntryPage = ({ currentUser, logout }) => {

    let loginDisplay;
    if (currentUser) {
        loginDisplay = (
            <div className="ep-welcome-display">
                <h1>Welcome, {currentUser.username}!</h1>
                <Link to="/app/home">Enter Discord<sub>(but worse)</sub></Link>
                <button onClick={logout}>Logout</button>
            </div>
        );
    } else {
        loginDisplay = (
            <div className="ep-login-display">
                <h1>A place to connect</h1>
                <p>Whether it's gaming, skiing, food, or whatever you're interested in,
                    discord<sub>(but worse)</sub> has the community for you. Or if you just want
                    a place to chat with your friends, discord<sub>(but worse)</sub> can do that too.
                </p>
                <div>
                    <Link className="signup-button" to="/signup"><img src=""/>Sign Up</Link>
                    <Link className="login button" to="/login">Login</Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="entry-container">
            <EntryHeader />
            {loginDisplay}
        </div>
    );

};

export default EntryPage;