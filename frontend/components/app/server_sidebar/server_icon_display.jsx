import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { findMembershipId } from "../../../util/selectors";


class ServerIconDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            startHover: false,
            stopHover: false,
            startSelect: false,
            stopSelect: false,

            showDropdown: false,
            showInvite: false,
            inviteCopied: false, // Used to show green border around invite input when link is copied
            showSettings: false,
            closeSettings: false,
            updatedServerLoading: false, // Used to "smooth" the loading time when updating a new server with an avatar


            // form info
            name: props.server.name,
            imageUrl: props.server.photoUrl,
            imageFile: null,
        };

        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShowSettings = this.handleShowSettings.bind(this);
        this.handleCloseSettings = this.handleCloseSettings.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleOutsideRightClick = this.handleOutsideRightClick.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this._resetFormValues = this._resetFormValues.bind(this);
        this.handleShowInvite = this.handleShowInvite.bind(this);
        this.handleInviteCopy = this.handleInviteCopy.bind(this);
        this.handleCloseInvite = this.handleCloseInvite.bind(this);
        this.handleStartHover = this.handleStartHover.bind(this);
        this.handleStopHover = this.handleStopHover.bind(this);
        this.handleStartSelect = this.handleStartSelect.bind(this);
        this.handleStopSelect = this.handleStopSelect.bind(this);
    }


    // ------------- Click and ESC event listeners for closing form -------------

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscape, true);
        document.addEventListener("click", this.handleOutsideClick, true);
        document.addEventListener("contextmenu", this.handleOutsideRightClick, true);
    }

    componentWillUnmount() {
        this.props.clearMembershipErrors();
        document.removeEventListener("keydown", this.handleEscape, true);
        document.removeEventListener("click", this.handleOutsideClick, true);
        document.removeEventListener("contextmenu", this.handleOutsideRightClick, true);
    }


    // ------------- Compare current props to previous props for deselect animation -------------

    componentWillReceiveProps(nextProps) {
        if (this.props.selected && !nextProps.selected) this.handleStopSelect();
    }


    // ------------- Event handlers for closing dropdown / settings -------------

    handleOutsideClick(e) {
        // Closing invite popup
        if (e.target.className === "ss-invite-relative-position-anchor") {
            this.setState({ showInvite: false });
            return;
        }

        // Closing dropdown
        if (!this.serverDropdownEl) return;
        if (!this.serverDropdownEl.contains(e.target)) {
            this.setState({ showDropdown: false });
            this._resetFormValues();
        }
    }

    handleOutsideRightClick(e) {
        if (!this.serverIconEl) return;
        if (!this.serverIconEl.contains(e.target)) {
            this.setState({ showDropdown: false });
            this._resetFormValues();
        }
    }

    handleEscape(e) {
        const { showSettings, showInvite } = this.state;

        if (e.keyCode === 27) {
            if (showSettings) {
                this.handleCloseSettings(e);
            } else {
                this.setState({ showDropdown: false, showInvite: false });
                this._resetFormValues();
                this.props.clearMembershipErrors();
            }
        }
    }


    // ------------- Event handlers for settings menu -------------

    handleShowSettings(e) {
        e.preventDefault();
        this.setState({ showDropdown: false, showSettings: true });
    }

    handleCloseSettings(e) {
        this.setState({ closeSettings: true });
        setTimeout(() => {
            this.setState({ closeSettings: false, showSettings: false });
            this._resetFormValues();
            this.props.clearMembershipErrors();
        }, 150)

    }

    handleReset(e) {
        e.preventDefault();
        this.setState({ name: this.props.server.name });
    }

    update(e) {
        this.setState({ name: e.currentTarget.value });
    }

    handleFileUpload(e) {
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        reader.onloadend = () =>
            this.setState({ imageUrl: reader.result, imageFile: file });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ imageUrl: this.props.server.photoUrl, imageFile: null });
        }
    }

    handleDelete(e) {
        e.preventDefault();
        const savedServerId = this.props.server.id;
        this.setState({ closeSettings: true });
        setTimeout(() => 
            this.props.deleteServer(this.props.server.id)
                .then(() => (window.location.href.includes(`/app/servers/${savedServerId}`)) ?
                    this.props.history.push("/app/home") : null)
        , 150);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ updatedServerLoading: true });

        const formData = new FormData();
        formData.append("id", this.props.server.id);
        formData.append("server[name]", this.state.name);
        if (this.state.imageFile) formData.append("server[photo]", this.state.imageFile);

        this.props.updateServer(formData)
            .then(() => {
                this.setState({ updatedServerLoading: false, closeSettings: true });
                this._resetFormValues();
                this.props.clearMembershipErrors();
                setTimeout(() => this.setState({ closeSettings: false, showSettings: false }), 150);
            })
    }


    // ------------- Event handlers for invite show -------------

    handleShowInvite(e) {
        e.preventDefault();
        this.setState({ showDropdown: false, showInvite: true });
    }

    handleInviteCopy(e) {
        e.preventDefault();
        navigator.clipboard.writeText(this.props.server.inviteCode);
        this.setState({ inviteCopied: true });
        setTimeout(() => this.setState({ inviteCopied: false }), 1500);
    }

    handleCloseInvite(e) {
        e.preventDefault();

        this.setState({ showInvite: false });
    }


    // ------------- Event handlers for right click dropdown -------------

    handleRightClick(e) {
        e.preventDefault();
        this.setState({ showDropdown: true })
    }

    handleLeave(e) {
        const savedServerId = this.props.server.id;
        const membershipId = findMembershipId(this.props.currentUser.id, this.props.server.id, this.props.memberships);
        this.props.deleteMembership(membershipId)
            .then(() => (window.location.href.includes(`/app/servers/${savedServerId}`)) ?
                this.props.history.push("/app/home") : null);
    }


    // ------------- Event handlers for hovering and selecting -------------

    handleStartHover() {
        this.setState({
            hovered: true,
            stopHover: false,
            startHover: true
        });
    }

    handleStopHover() {
        this.setState({
            hovered: false,
            startHover: false,
            stopHover: true
        });

        setTimeout(() => this.setState({ stopHover: false }), 200);
    }

    handleStartSelect() {
        this.props.currentServerDetails(this.props.server.id)
        this.setState({
            stopSelect: false,
            startSelect: true
        });
        setTimeout(() => this.setState({ startSelect: false }), 100);
    }

    handleStopSelect() {
        this.setState({
            startSelect: false,
            stopSelect: true
        });
        setTimeout(() => this.setState({ stopSelect: false }), 100);
    }


    // ------------- Helper method for resetting form values -------------

    _resetFormValues() {
        this.setState({
            name: this.props.server.name,
            imageUrl: this.props.server.photoUrl,
            imageFile: null
        });
    }


    render() {
        const { server, currentUser, selected, firstTextChannelId, error } = this.props
        const { hovered, showDropdown, showInvite, showSettings, name, imageUrl, updatedServerLoading, 
                inviteCopied, startHover, stopHover, startSelect, stopSelect, closeSettings } = this.state;


        const serverNameShow = (
            <div className="ss-relative-position-anchor">
                <div className="ss-name-show" style={{ top: `${this.serverIconEl ? 
                    this.serverIconEl.getBoundingClientRect().top + 8 : 0}px` }}>{server.name}</div>
                <div className="ss-name-show-arrow-left" style={{top: `${this.serverIconEl ? 
                    this.serverIconEl.getBoundingClientRect().top + 18 : 0}px` }}></div>
            </div>
        );


        const serverDropdown = (
            <div className="ss-options-relative-position-anchor">
                <ul className="ss-dropdown" ref={serverDropdownEl => this.serverDropdownEl = serverDropdownEl}
                    style={{ top: `${this.serverIconEl ? (window.innerHeight - this.serverIconEl.getBoundingClientRect().bottom) < 100 ?
                        window.innerHeight - 120 : this.serverIconEl.getBoundingClientRect().top + 30 : 0}px` }}>

                    <li id="ss-options-invite" onClick={this.handleShowInvite}>Invite People</li>
                    {currentUser.id === server.ownerId ?
                        <li id="ss-options-settings" onClick={this.handleShowSettings}>Server Settings</li> :
                        <li id="ss-options-leave" onClick={this.handleLeave}>Leave Server</li>
                    }
                    <li id="ss-options-cancel" onClick={() => this.setState({ showDropdown: false })}>Cancel</li>
                </ul>
            </div>
        );


        const serverInvite = (
          <div className="ss-invite-relative-position-anchor">
              <div className="ss-invite-container">
                <button id="ss-close-create-form" onClick={this.handleCloseInvite}>x</button>

                <form className="server-invite-form">
                    <label className="server-invite-copy-label">SEND A SERVER INVITE LINK TO A FRIEND
                            <input className="server-invite-copy-input" id={inviteCopied ? "copied" : null}
                                    type="text" value={server.inviteCode} readOnly />
                    </label>

                    <button className="copy-invite-button" id={inviteCopied ? "copied" : null} 
                            onClick={this.handleInviteCopy}>Copy</button>
                </form>
              </div>
          </div>  
        );


        const serverSettings = (
            <div className="server-settings-container" id={updatedServerLoading ? "updated-server-loading" : 
                closeSettings ? "ss-settings-closing" : null}>

                <div className="server-settings-cancel-button">
                    <div className="server-settings-x-button" onClick={this.handleCloseSettings}>x</div>
                    <p>ESC</p>
                </div>

                <div className="server-settings-left">
                    <ul>
                        <li>Overview</li>
                        <li className="server-settings-delete-button" onClick={this.handleDelete}>Delete Server</li>
                    </ul>
                </div>

                <div className="server-settings-right">
                    <h1>Server Overview</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="server-settings-form-container">

                            <div className="server-settings-image-upload-container">
                                <label className="server-settings-image-upload"
                                    style={imageUrl === "noPhoto" ? null : { backgroundImage: `url(${imageUrl})` }}
                                    id={imageUrl === "noPhoto" ? null : "server-update-has-photo"}>
                                    <p>{imageUrl === "noPhoto" ? server.name[0] : null}</p>
                                    <input className="server-update-file-input" type="file" onChange={this.handleFileUpload} />
                                </label>
                                <h2>Upload Image</h2>
                            </div>

                            <label id={error.length > 0 ? "server-settings-error" : null}>
                                SERVER NAME <span>{error.length > 0 ? `- ${error}` : null}</span>
                                <input type="text" value={name} onChange={this.update} />
                            </label>
                        </div>

                        <div>
                            <section onClick={this.handleReset}>Reset</section>
                            <input id={name === "" || updatedServerLoading ? "server-settings-invalid" : null} className="server-settings-save-changes" type="submit" value="Save Changes" />
                        </div>
                    </form>
                </div>
            </div>
        );


        return (
            <div>
                {showSettings ? serverSettings : null}
                {showInvite ? serverInvite : null}

                <div className="ss-hover-bar-relative-position-anchor">
                    <aside className="ss-server-hover-bar" id={startSelect ? "start-select" : stopSelect ? "stop-select" :
                        selected ? "selected" : startHover ? "start-hover" : stopHover ? "stop-hover" : null}></aside>
                </div>

                <Link to={`/app/servers/${server.id}/${firstTextChannelId}`} onClick={this.handleStartSelect}>

                    <li className={selected ? "selected" : startHover ? "start-hover" : stopHover || stopSelect ? "stop-hover" : null}
                        onMouseEnter={this.handleStartHover}
                        onMouseLeave={this.handleStopHover}
                        onContextMenu={this.handleRightClick}
                        ref={serverIconEl => this.serverIconEl = serverIconEl}
                        style={server.photoUrl === "noPhoto" ? null : { backgroundImage: `url(${server.photoUrl})` }}
                        id={server.photoUrl === "noPhoto" ? "no-photo" : "server-has-photo"}>
                        <div>{server.photoUrl === "noPhoto" ? server.name[0] : null}</div>
                    </li>
                </Link>

                {hovered ? serverNameShow : null}
                {showDropdown ? serverDropdown : null}
            </div>
        );
    }
}


export default withRouter(ServerIconDisplay);