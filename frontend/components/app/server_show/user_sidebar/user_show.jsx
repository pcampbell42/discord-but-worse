import React from "react";
import { withRouter } from "react-router";
import defaultProfilePicture from "./../../../../../app/assets/images/default_profile_picture.png";
import crownIcon from "./../../../../../app/assets/images/crown_icon.png";
import { findCurrentSubscription, createUserSubscription, findUserSubscription } from "../../../../util/websockets_helpers";


class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfile: false,
            body: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }


    // ------------- Click and ESC event listeners for closing user info -------------

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscape, true);
        document.addEventListener("click", this.handleOutsideClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscape, true);
        document.removeEventListener("click", this.handleOutsideClick, true);
    }


    // ------------- Event handlers for different ways of closing user info -------------

    handleOutsideClick(e) {
        if (!this.showProfileEl) return;
        if (!this.showProfileEl.contains(e.target)) {
            this.setState({ body: "", showProfile: false });
        }
    }

    handleEscape(e) {
        if (e.keyCode === 27) {
            this.setState({ body:"", showProfile: false });
        }
    }


    // ------------- Event handlers for messaging user from user info -------------

    update(e) {
        this.setState({ body: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.state.body === "") return;

        // DM already exists, just send message
        if (this.props.dmExists) {
            // Format message
            let messageToSend = Object.assign({}, { body: this.state.body }, { author_id: this.props.currentUser.id });

            // Get DM websocket subscription
            let subscriptionNum = findCurrentSubscription("dm", this.props.dmId);

            // Send Message
            App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });

            // Redirect to DM and close user profile
            if (this.state.body !== "") this.props.history.push(`/app/home/conversations/${this.props.dmId}`);
            this.setState({ showProfile: false, body: "" });
        }
    
        // DM doesn't exist, so make new DM and send message
        else {
            // Format DM and message
            let dmToCreate = { current_user_id: this.props.currentUser.id };
            let messageToSend = Object.assign({}, { body: this.state.body }, { author_id: this.props.currentUser.id });

            // Subscribe to the target user's UserChannel
            createUserSubscription(this.props.user.id, this.props.receiveDirectMessage, 
                this.props.receiveUser, this.props.receiveAllMessages, this.props.receiveMessage,
                this.props.deleteMessage);

            // Wait a tiny amount of time to avoid bug where subscription isn't created yet
            setTimeout(() => {
                // Call createDM to target user's UserChannel (Basically tells all subscribers
                // to save this DM to state). Note that this is kind of bug prone (if someone else
                // happens to be subscribed to the channel at the exact same time, they would save
                // this DM to state).
                let userSubscriptionNum = findUserSubscription(this.props.user.id);
                App.cable.subscriptions.subscriptions[userSubscriptionNum].createDM({ dm: dmToCreate });

                // Tiny timeout to wait for DM to be made and subscribed to
                setTimeout(() => {
                    // Get DM subscription and send message
                    let subscriptionNum = findCurrentSubscription("dm", this.props.dmId);
                    App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });

                    // Close user profile and redirect to DM
                    this.setState({ showProfile: false, body: "" });
                    this.props.history.push(`/app/home/conversations/${this.props.dmId}`);

                    // Remove user subscription (shouldn't stay subscribed to other user's channel)
                    App.cable.subscriptions.remove(App.cable.subscriptions.subscriptions[userSubscriptionNum]);
                }, 100)
            }, 100);
        }
    }


    render() {
        const { user, server, currentUser, membership } = this.props;

        const profileDisplay = (
            <div className="user-show-relative-position-anchor">
                <div className="user-show-profile-display" ref={showProfileEl => this.showProfileEl = showProfileEl}
                    style={{ top: `${this.userDisplay ? (window.innerHeight - this.userDisplay.getBoundingClientRect().bottom) < 220 ? 
                        window.innerHeight - 230 : this.userDisplay.getBoundingClientRect().bottom - 41 : 0}px` }}>

                    <div className="user-show-profile-header"></div>
                    <button onClick={() => this.setState({ showProfile: false, body: "" })}>x</button>

                    <img src={user.photoUrl === "noPhoto" ? defaultProfilePicture : user.photoUrl}/>

                    <div>
                        <h1>{membership.nickname !== "" ? membership.nickname : user.username}</h1>
                        {user.id !== currentUser.id ? 
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" onChange={this.update} placeholder={`Message @${membership.nickname !== "" ? 
                                    membership.nickname : user.username}`}/>
                            </form>
                            :
                            null
                        }
                    </div>

                </div>
            </div>
        );

        return (
            <li id={this.state.showProfile ? "selected" : null} ref={userDisplay => this.userDisplay = userDisplay}>
                <section onClick={() => this.setState({ showProfile: true })}>
                    <img src={user.photoUrl === "noPhoto" ? defaultProfilePicture : user.photoUrl}/>
                    {membership.nickname !== "" ? membership.nickname : user.username}
                    {user.id === server.ownerId ? <img className="king-icon" src={crownIcon} /> : null}

                </section>

                {this.state.showProfile ? profileDisplay: null}
            </li>
        );
    }
}

// export default UserShow;
export default withRouter(UserShow);
