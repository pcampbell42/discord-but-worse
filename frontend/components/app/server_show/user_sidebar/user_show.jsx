import React from "react";
import { withRouter } from "react-router";
import defaultProfilePicture from "./../../../../../app/assets/images/default_profile_picture.png";
import crownIcon from "./../../../../../app/assets/images/crown_icon.png";
import { createSubscription, findCurrentSubscription } from "../../../../util/websockets_helpers";


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

        if (this.props.dmExists) {
            let messageToSend = Object.assign({}, { body: this.state.body }, { author_id: this.props.currentUser.id });
            let subscriptionNum = findCurrentSubscription("dm", this.props.dmId);

            App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });
            if (this.state.body !== "") this.props.history.push(`/app/home/conversations/${this.props.dmId}`);
            this.setState({ showProfile: false, body: "" });
            

        } else {
            let messageToSend = Object.assign({}, { body: this.state.body }, { author_id: this.props.currentUser.id });

            this.props.createDirectMessage({ user1_id: this.props.currentUser.id, user2_id: this.props.user.id })
                .then(() => {
                    // Create websocket subscription to DM
                    createSubscription("dm", this.props.dmId, this.props.receiveAllMessages, 
                        this.props.receiveMessage, this.props.deleteMessage)

                        // Not an ideal fix, but need a tiny delay or sometimes the subscription isn't created
                        // by the time the message is created, resulting in the message getting lost forever
                        setTimeout(() => {
                            // Get subscription and send message
                            let subscriptionNum = findCurrentSubscription("dm", this.props.dmId);
                            App.cable.subscriptions.subscriptions[subscriptionNum].create({ message: messageToSend });
        
                            // Close user profile and redirect to DM
                            this.setState({ showProfile: false, body: "" })
                            this.props.history.push(`/app/home/conversations/${this.props.dmId}`)
                        }, 50)
                });
        }
    }


    render() {
        const { user, server, currentUser } = this.props;

        const profileDisplay = (
            <div className="user-show-relative-position-anchor">
                <div className="user-show-profile-display" ref={showProfileEl => this.showProfileEl = showProfileEl}>

                    <div className="user-show-profile-header"></div>
                    <button onClick={() => this.setState({ showProfile: false, body: "" })}>x</button>

                    <img src={user.photoUrl === "noPhoto" ? defaultProfilePicture : user.photoUrl}/>

                    <div>
                        <h1>{user.username}</h1>
                        {user.id !== currentUser.id ? 
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" onChange={this.update} placeholder={`Message @${user.username}`}/>
                            </form>
                            :
                            null
                        }
                    </div>

                </div>
            </div>
        );

        return (
            <li id={this.state.showProfile ? "selected" : null}>
                <section onClick={() => this.setState({ showProfile: true })}>
                    <img src={user.photoUrl === "noPhoto" ? defaultProfilePicture : user.photoUrl}/>
                    {user.username}
                    {user.id === server.ownerId ? <img className="king-icon" src={crownIcon} /> : null}

                </section>

                {this.state.showProfile ? profileDisplay: null}
            </li>
        );
    }
}

// export default UserShow;
export default withRouter(UserShow);
