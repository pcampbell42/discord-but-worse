import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import ServerIconDisplayContainer from "./server_icon_display_container";
import { createSubscription } from "../../../util/websockets_helpers";
import discordLogo from "../../../../app/assets/images/discord_logo.png";


class ServersSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            homeHovered: false,
            createHovered: false,
            newServerLoading: false, // Used to "smooth" the loading time when creating a new server with an avatar

            // form info
            name: `${props.currentUser.username}'s server`,
            imageUrl: "",
            imageFile: null
        };

        this._resetFormValues = this._resetFormValues.bind(this);
        this.update = this.update.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        if (e.target.className === "ss-create-form-relative-position-anchor") {
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


    // ------------- Event handlers for updating form values -------------

    update(e) {
        this.setState({ name: e.currentTarget.value })
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


    // ------------- Event handler for submitting form -------------

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
                this.props.currentServerDetails(this.props.userServers[this.props.userServers.length - 1].id);

                // Create websocket subscription for default text channel in new server
                createSubscription("tc", this.props.textChannels[this.props.textChannels.length - 1].id,
                    this.props.receiveAllMessages, this.props.receiveMessage, this.props.deleteMessage);

                // Finally, redirect to default text channel in new server
                this.props.history.push(`/app/servers/${this.props.userServers[0].id}/${this.props.textChannels[this.props.textChannels.length - 1].id}`);
            })
            .then(() => this.setState({ newServerLoading: false }))
    }


    // ------------- Helper method for resetting state -------------

    _resetFormValues() {
        this.setState({
            name: `${this.props.currentUser.username}'s server`,
            imageUrl: "",
            imageFile: null,
            showForm: false
        });
    }


    render() {
        const { error, homeSelected } = this.props;
        const { imageUrl, name, showForm, createHovered, homeHovered, newServerLoading } = this.state;


        const homeTooltipShow = (
            <div className="ss-home-relative-position-anchor">
                <div className="ss-home-tooltip-show">Server Discovery</div>
                <div className="ss-home-arrow-left"></div>
            </div>
        );


        const createTooltipShow = (
            <div className="ss-create-relative-position-anchor">
                <div className="ss-create-tooltip-show">Create a Server</div>
                <div className="ss-create-arrow-left"></div>
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
                            <span></span>
                            <input id={name === "" || newServerLoading ? "ss-invalid" : null} className="ss-submit-button" type="submit" value="Create" />
                        </footer>
                    </form>
                </div>
            </div >
        );


        return (
            <div className="ss-container">
                {showForm ? createServerForm : null}

                <div className="ss-buffer"></div>

                <Link to="/app/home" onMouseEnter={() => this.setState({ homeHovered: true })}
                    onMouseLeave={() => this.setState({ homeHovered: false })}>

                    <div className="ss-home-hover-bar-relative-position-anchor">
                        <aside className={homeHovered ? "hovered" : null} id={homeSelected ? "selected" : null}></aside>
                    </div>

                    <div className="ss-logo-container" id={homeSelected ? "selected" : null}>
                        <img src={discordLogo} />
                    </div>
                </Link>
                {homeHovered ? homeTooltipShow : null}

                <ul className="ss-servers">
                    {this.props.userServers.map(server =>
                        <ServerIconDisplayContainer key={server.id} server={server}
                            selected={window.location.href.includes(`/app/servers/${server.id}/`)} />
                    )}
                </ul>

                <button onClick={() => this.setState({ showForm: true })}
                    onMouseEnter={() => this.setState({ createHovered: true })}
                    onMouseLeave={() => this.setState({ createHovered: false })}>
                    +
                </button>
                {createHovered ? createTooltipShow : null}
            </div>
        );
    }
}


export default withRouter(ServersSideBar);
