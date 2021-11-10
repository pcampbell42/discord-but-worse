import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { findMembershipId } from "../../../util/selectors";


class ServerIconDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Hovered / selected animations
            hovered: false,
            startHover: false,
            stopHover: false,
            startSelect: false,
            stopSelect: false,

            // Dropdown
            showDropdown: false,
            
            // Server invite
            showInvite: false,
            closeInvite: false,
            inviteCopied: false, // Used to show green border around invite input when link is copied
            
            // Server profile
            showEditProfile: false,
            closeEditProfile: false,
            nickname: props.membership.nickname,

            // Server settings
            showSettings: false,
            closeSettings: false,
            updatedServerLoading: false, // Used to "smooth" the loading time when updating a new server with an avatar
            name: props.server.name,
            imageUrl: props.server.photoUrl,
            imageFile: null,
        };

        // General closing handlers
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleOutsideRightClick = this.handleOutsideRightClick.bind(this);

        // Settings handlers
        this.handleLeave = this.handleLeave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShowSettings = this.handleShowSettings.bind(this);
        this.handleCloseSettings = this.handleCloseSettings.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

        // Invite form handlers
        this.handleShowInvite = this.handleShowInvite.bind(this);
        this.handleInviteCopy = this.handleInviteCopy.bind(this);
        this.handleCloseInvite = this.handleCloseInvite.bind(this);

        // Edit profile form handlers
        this.handleShowEditProfile = this.handleShowEditProfile.bind(this);
        this.handleCloseEditProfile = this.handleCloseEditProfile.bind(this);
        this.handleSubmitEditProfile = this.handleSubmitEditProfile.bind(this);
        this.handleUpdateNickname = this.handleUpdateNickname.bind(this);

        // Hover / select handlers
        this.handleStartHover = this.handleStartHover.bind(this);
        this.handleStopHover = this.handleStopHover.bind(this);
        this.handleStartSelect = this.handleStartSelect.bind(this);
        this.handleStopSelect = this.handleStopSelect.bind(this);

        // Reset form values
        this._resetFormValues = this._resetFormValues.bind(this);
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
            this.handleCloseInvite(e);
            return;
        }

        if (e.target.className === "ss-ep-anchor") {
            this.handleCloseEditProfile(e);
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
        const { showSettings, showInvite, showEditProfile } = this.state;

        if (e.keyCode === 27) {
            if (showSettings) {
                this.handleCloseSettings(e);
            } 
            else if (showInvite) {
                this.handleCloseInvite(e);
            }
            else if (showEditProfile) {
                this.handleCloseEditProfile(e);
            }
            else {
                this.setState({ showDropdown: false });
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
        this.setState({ closeInvite: true });
        setTimeout(() => this.setState({ closeInvite: false, showInvite: false }), 100)
    }


    // ------------- Event handlers for edit server profile -------------

    handleShowEditProfile(e) {
        e.preventDefault();
        this.setState({ showDropdown: false, showEditProfile: true });
    }

    handleUpdateNickname(e) {
        this.setState({ nickname: e.currentTarget.value });
    }

    handleSubmitEditProfile(e) {
        e.preventDefault();
        this.props.updateMembership({ id: this.props.membership.id, nickname: this.state.nickname });
        this.setState({ closeEditProfile: true });
        setTimeout(() => this.setState({ closeEditProfile: false, showEditProfile: false }), 100)
    }

    handleCloseEditProfile(e) {
        e.preventDefault();
        this.setState({ closeEditProfile: true });
        this._resetFormValues();
        setTimeout(() => this.setState({ closeEditProfile: false, showEditProfile: false }), 100)
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
            imageFile: null,
            nickname: this.props.membership.nickname
        });
    }


    render() {
        const { server, currentUser, selected, firstTextChannelId, error, memberships } = this.props
        const { hovered, showDropdown, showInvite, showSettings, name, imageUrl, updatedServerLoading, 
                inviteCopied, startHover, stopHover, startSelect, stopSelect, closeSettings,
                closeInvite, showEditProfile, closeEditProfile, nickname } = this.state;


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
                    <li id="ss-options-edit-profile" onClick={this.handleShowEditProfile}>Edit Server Profile</li>
                    {currentUser.id === server.ownerId ?
                        <li id="ss-options-settings" onClick={this.handleShowSettings}>Server Settings</li> : 
                        <li id="ss-options-leave" onClick={this.handleLeave}>Leave Server</li>
                    }
                    <li id="ss-options-cancel" onClick={() => this.setState({ showDropdown: false })}>Cancel</li>
                </ul>
            </div>
        );


        const serverInvite = (
          <div className="ss-invite-relative-position-anchor" id={closeInvite ? "sio-background-closing" : null}>
              <div className="ss-invite-container" id={closeInvite ? "sio-closing" : null}>
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

        
        const serverProfile = (
            <div className="ss-ep-anchor" id={closeEditProfile ? "ss-ep-background-fading" : null}>
                <div className="ss-ep-container" id={closeEditProfile ? "ss-ep-closing" : null}>
                    <button className="ss-ep-close" onClick={this.handleCloseEditProfile}>x</button>
                    
                    <div className="ss-ep-top">
                        <h1 className="ss-ep-header">Edit Server Profile</h1>
                        <p className="ss-ep-description">You can change how others see you inside this server by setting a server nickname</p>
                    </div>

                    <form className="ss-ep-form" onSubmit={this.handleSubmitEditProfile}>
                        <label className="ss-ep-label"> NICKNAME
                            <input className="ss-ep-input" type="text" placeholder={currentUser.username} value={nickname} 
                                onChange={this.handleUpdateNickname} />
                        </label>

                        <h3 className="ss-ep-reset" onClick={this._resetFormValues}>Reset Nickname</h3>

                        <footer className="ss-ep-form-footer">
                            <span className="ss-ep-cancel" onClick={this.handleCloseEditProfile}>Cancel</span>
                            <input className="ss-ep-submit" type="submit" value="Save" />
                        </footer>
                    </form>
                </div>
            </div>
        )


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
                {showEditProfile ? serverProfile : null}

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