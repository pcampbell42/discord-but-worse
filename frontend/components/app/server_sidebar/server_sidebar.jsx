import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import ServerIconDisplayContainer from "./server_icon_display_container";
import { createSubscription } from "../../../util/websockets_helpers";
import { getServerTextChannels } from "../../../util/selectors";
import discordLogo from "../../../../app/assets/images/discord_logo.png";
import rightArrow from "../../../../app/assets/images/right_arrow.png";
import serverCreateIcon from "../../../../app/assets/images/server_create_icon.png";


class ServersSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // modal stuff
            showAddForm: false,
            showCreateForm: false,
            showJoinForm: false,

            // hover animations
            homeHovered: false,
            startHoverHome: false,
            stopHoverHome: false,
            createHovered: false,
            startHoverCreate: false,
            stopHoverCreate: false,

            // Used to "smooth" the loading time when creating a new server with an avatar
            newServerLoading: false,

            // form info
            name: `${props.currentUser.username}'s server`,
            imageUrl: "",
            imageFile: null,
            inviteCode: "",
            invalidCode: false
        };

        this._resetFormValues = this._resetFormValues.bind(this);
        this.update = this.update.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleGoToCreate = this.handleGoToCreate.bind(this);
        this.handleGoToJoin = this.handleGoToJoin.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleStartHoverHome = this.handleStartHoverHome.bind(this);
        this.handleStopHoverHome = this.handleStopHoverHome.bind(this);
        this.handleStartHoverCreate = this.handleStartHoverCreate.bind(this);
        this.handleStopHoverCreate = this.handleStopHoverCreate.bind(this);
    }


    // ------------- Click and ESC event listeners for closing form -------------

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscape, true);
        document.addEventListener("click", this.handleClick, true);
    }

    componentWillUnmount() {
        this.props.clearMembershipErrors();
        document.removeEventListener("keydown", this.handleEscape, true);
        document.removeEventListener("click", this.handleClick, true);
    }


    // ------------- Event handler for different ways of closing form -------------

    handleClick(e) {
        // If click is outside of form, close form
        if (e.target.className === "ss-add-relative-position-anchor" ||
            e.target.className === "ss-create-form-relative-position-anchor" ||
            e.target.className === "ss-join-relative-position-anchor") {
            this._resetFormValues();
            this.props.clearMembershipErrors();
        }
    }

    handleEscape(e) {
        if (e.keyCode === 27) {
            this._resetFormValues();
            this.props.clearMembershipErrors();
        }
    }

    handleClose(e) {
        e.preventDefault();
        this._resetFormValues();
        this.props.clearMembershipErrors();
    }


    // ------------- Event handlers for navigating forms -------------

    handleGoToCreate(e) {
        e.preventDefault();
        this.setState({ showAddForm: false, showCreateForm: true });
    }

    handleGoToJoin(e) {
        e.preventDefault();
        this.setState({ showAddForm: false, showJoinForm: true });
    }

    handleBack(e) {
        e.preventDefault();
        this._resetFormValues();
        this.setState({ showAddForm: true })
    }

    handleRedirect(e) {
        this.handleClose(e);
        this.props.history.push("/app/home");
    }


    // ------------- Event handlers for updating form values -------------

    update(e) {
        if (this.state.showCreateForm) this.setState({ name: e.currentTarget.value });
        if (this.state.showJoinForm) this.setState({ inviteCode: e.currentTarget.value });
    }

    handleFileUpload(e) {
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        reader.onloadend = () =>
            this.setState({ imageUrl: reader.result, imageFile: file });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ imageUrl: "", imageFile: null });
        }
    }


    // ------------- Event handlers for submitting forms -------------

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ newServerLoading: true });

        const formData = new FormData();
        formData.append("server[name]", this.state.name)
        if (this.state.imageFile) formData.append("server[photo]", this.state.imageFile)

        this.props.createServer(formData)
            .then(() => {
                // Reset all the values...
                this._resetFormValues();
                this.props.clearMembershipErrors();

                // Grab info for new server
                this.props.currentServerDetails(this.props.userServers[this.props.userServers.length - 1].id)
                    .then(() => {
                        // Create websocket subscription for default text channel in new server
                        createSubscription("tc", this.props.textChannels[this.props.textChannels.length - 1].id,
                            this.props.receiveAllMessages, this.props.receiveMessage, this.props.deleteMessage);
        
                        // Finally, redirect to default text channel in new server
                        this.props.history.push(`/app/servers/${this.props.userServers[0].id}/${this.props.textChannels[this.props.textChannels.length - 1].id}`);
                    });
            })
            .then(() => this.setState({ newServerLoading: false }))
    }

    handleJoin(e) {
        e.preventDefault();

        // No need for a backend call to check if valid because we will always have
        // all the servers in state - for a larger scale project, we would obviously
        // want to create a new route. The only possible error here is if someone 
        // creates a new server and immediately sends you an invite, you might not have
        // that server in state yet (depending on where you've been navigating).

        // Get all joined server ids for current user
        let currentUserServerIds = [];
        for (let i = 0; i < this.props.userServers.length; i++) {
            currentUserServerIds.push(this.props.userServers[i].id);
        }

        // Checking if valid code
        let invalidCode = true;
        let serverId;
        for (let i = 0; i < this.props.servers.length; i++) {
            if (this.props.servers[i].inviteCode === this.state.inviteCode &&
                !currentUserServerIds.includes(this.props.servers[i].id)) {
                invalidCode = false;
                serverId = this.props.servers[i].id;
            }
        }

        if (invalidCode) {
            this.setState({ invalidCode: true })
        } else {
            this.props.createMembership({ server_id: serverId })
                .then(() => {
                    // Reset all the values...
                    this._resetFormValues();
                    this.props.clearMembershipErrors();

                    // Grab server info
                    this.props.currentServerDetails(serverId)
                        .then(() => {
                            let serverTextChannels = getServerTextChannels(this.props.textChannels, serverId.toString());

                            // Create websocket subscriptions to each text channel
                            serverTextChannels.forEach(textChannel =>
                                createSubscription("tc", textChannel.id, this.props.receiveAllMessages,
                                    this.props.receiveMessage, this.props.deleteMessage)
                            );

                            // Finally, redirect to default text channel in new server
                            this.props.history.push(`/app/servers/${serverId}/${serverTextChannels[0].id}`);
                        });
                });
        }
    }


    // ------------- Event handlers for hovering -------------

    handleStartHoverHome() {
        this.setState({
            homeHovered: true,
            stopHoverHome: false,
            startHoverHome: true
         });
    }

    handleStopHoverHome() {
        this.setState({
            homeHovered: false,
            startHoverHome: false,
            stopHoverHome: true
         });

         setTimeout(() => this.setState({ stopHoverHome: false }), 200);
    }

    handleStartHoverCreate() {
        this.setState({
            createHovered: true,
            stopHoverCreate: false,
            startHoverCreate: true
        });
    }

    handleStopHoverCreate() {
        this.setState({
            createHovered: false,
            startHoverCreate: false,
            stopHoverCreate: true
        });

        setTimeout(() => this.setState({ stopHoverCreate: false }), 200);
    }


    // ------------- Helper method for resetting state -------------

    _resetFormValues() {
        this.setState({
            name: `${this.props.currentUser.username}'s server`,
            imageUrl: "",
            imageFile: null,
            inviteCode: "",
            invalidCode: false,
            showAddForm: false,
            showCreateForm: false,
            showJoinForm: false
        });
    }


    render() {
        const { error, homeSelected } = this.props;
        const { imageUrl, name, showCreateForm, createHovered, homeHovered, newServerLoading,
                showAddForm, showJoinForm, inviteCode, invalidCode, startHoverHome, stopHoverHome,
                startHoverCreate, stopHoverCreate } = this.state;

        const homeTooltipShow = (
            <div className="ss-home-relative-position-anchor">
                <div className="ss-home-tooltip-show" style={{ top: `${this.homeLink ? 
                    this.homeLink.getBoundingClientRect().top + 8 : 0}px` }}>Server Discovery</div>
                <div className="ss-home-arrow-left" style={{ top: `${this.homeLink ? 
                    this.homeLink.getBoundingClientRect().top + 18 : 0}px`}}></div>
            </div>
        );


        const createTooltipShow = (
            <div className="ss-create-relative-position-anchor">
                <div className="ss-create-tooltip-show" style={{ top: `${this.createButton ? 
                    this.createButton.getBoundingClientRect().top + 8 : 0}px` }}>Add a Server</div>
                <div className="ss-create-arrow-left" style={{ top: `${this.createButton ? 
                    this.createButton.getBoundingClientRect().top + 18 : 0}px` }}></div>
            </div>
        );

        const addServerForm = (
            <div className="ss-add-relative-position-anchor">
                <div className="ss-add-container">
                    <button className="ss-close-add-form" onClick={this.handleClose}>x</button>

                    <div className="ss-add-header">
                        <h1 className="ss-add-create-header">Create a server</h1>
                        <p className="ss-add-create-description">Your server is where you and your friends hang out. Make yours and start talking.</p>
                    </div>

                    <button className="ss-add-create-button" onClick={this.handleGoToCreate}>
                        <div className="ss-add-create-button-left">
                            <img className="ss-add-img-create-icon" src={serverCreateIcon} />
                            <p className="ss-add-create-button-text">Create My Own</p>
                        </div>
                        <img className="ss-add-img-right-arrow" src={rightArrow} />
                    </button>

                    <footer className="ss-add-footer">
                        <h2 className="ss-add-join-header">Have an invite already?</h2>
                        <button className="ss-add-join-button" onClick={this.handleGoToJoin}>Join a Server</button>
                    </footer>
                </div>
            </div>
        );
        

        const createServerForm = (
            <div className="ss-create-form-relative-position-anchor">
                <div id={newServerLoading ? "new-server-loading" : null}>
                    <button id="ss-close-create-form" onClick={this.handleClose}>x</button>

                    <div>
                        <h1>Customize your server</h1>
                        <h2>Give your server a personality with a name and an icon. You can always change it later.</h2>

                        <label className="server-custom-file-input"
                            style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : null}>
                            <input className="file-input" type="file" onChange={this.handleFileUpload} />
                        </label>
                    </div>

                    <form onSubmit={name === "" ? null : this.handleSubmit}>
                        <label id={error.length < 1 ? null : "ss-error"}>
                            SERVER NAME <span>{error.length < 1 ? null : `- ${error}`}</span>
                            <input type="text" value={name} onChange={this.update} />
                        </label>
                        <footer>
                            <span className="ss-create-back-button" onClick={this.handleBack}>Back</span>
                            <input id={name === "" || newServerLoading ? "ss-invalid" : null} className="ss-submit-button" type="submit" value="Create" />
                        </footer>
                    </form>
                </div>
            </div >
        );


        const joinServerForm = (
            <div className="ss-join-relative-position-anchor">
                <div className="ss-join-container">
                    <button className="ss-close-join-form" onClick={this.handleClose}>x</button>

                    <div className="ss-join-header">
                        <h1 className="ss-join-title">Join a Server</h1>
                        <p className="ss-join-description">Enter an invite below to join an existing server.</p>
                    </div>

                    <form className="ss-join-form" onSubmit={this.handleJoin}>
                        <div className="ss-join-form-upper">
                            <label className="ss-join-label" id={invalidCode ? "invalid" : null}>
                                INVITE LINK {invalidCode ? 
                                    <span className="ss-join-error-message">- The invite is invalid</span> : 
                                    <span className="ss-join-asterisk">*</span>}
                                <input className="ss-join-input" type="text" value={inviteCode} 
                                    placeholder="Af5Ty-rKLYHwaj3wYLSAnA" onChange={this.update} />
                            </label>

                            <h3 className="ss-join-invite-example-header">INVITES SHOULD LOOK LIKE</h3>
                            <p className="ss-join-invite-example">yJ3H2owV6tgf9U1q87ym2g</p>
                        </div>

                        <div className="ss-join-form-middle">
                            <h2 className="ss-join-home-header">Don't have an invite?</h2>
                            <Link to="/app/home" className="ss-join-home-link" 
                                onClick={this.handleRedirect}>Join public servers in Server Discovery</Link>
                        </div>

                        <footer className="ss-join-form-lower">
                            <span className="ss-join-back-button" onClick={this.handleBack}>Back</span>
                            <input className="ss-join-submit" type="submit" value="Join Server" />
                        </footer>
                    </form>
                </div>
            </div>
        );


        return (
            <div className="ss-container">
                {showAddForm ? addServerForm : null}
                {showCreateForm ? createServerForm : null}
                {showJoinForm ? joinServerForm : null}

                <Link to="/app/home" onMouseEnter={this.handleStartHoverHome}
                    className="home-link" onMouseLeave={this.handleStopHoverHome}
                    ref={homeLink => this.homeLink = homeLink}>

                    <div className="ss-home-hover-bar-relative-position-anchor">
                        <aside className="ss-home-hover-bar" id={homeSelected ? "selected" : startHoverHome ? 
                            "start-hover-home" : stopHoverHome ? "stop-hover-home" : null}></aside>
                    </div>

                    <div className="ss-logo-container" id={homeSelected ? "selected" : startHoverHome ? 
                        "start-hover-home" : stopHoverHome ? "stop-hover-home" : null}>
                        <img src={discordLogo} />
                    </div>
                </Link>
                {homeHovered ? homeTooltipShow : null}

                <aside className="ss-home-link-under-bar"></aside>

                <ul className="ss-servers">
                    {this.props.userServers.map(server =>
                        <ServerIconDisplayContainer key={server.id} server={server}
                            selected={window.location.href.includes(`/app/servers/${server.id}/`)} />
                    )}
                </ul>

                <button className="ss-create-button"
                    onClick={() => this.setState({ showAddForm: true })}
                    onMouseEnter={this.handleStartHoverCreate}
                    onMouseLeave={this.handleStopHoverCreate}
                    id={startHoverCreate ? "start-hover-create" : stopHoverCreate ? "stop-hover-create" : null}
                    ref={createButton => this.createButton = createButton}>
                    +
                </button>
                {createHovered ? createTooltipShow : null}
            </div>
        );
    }
}


export default withRouter(ServersSideBar);
