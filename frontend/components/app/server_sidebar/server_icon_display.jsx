import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { findMembershipId } from "../../../util/selectors";


class ServerIconDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            showDropdown: false,
            showSettings: false,
            updatedServerLoading: false, // Used to "smooth" the loading time when updating a new server with an avatar

            // form info
            name: props.server.name,
            imageUrl: props.server.photoUrl,
            imageFile: null
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


    // ------------- Event handlers for closing dropdown / settings -------------

    handleOutsideClick(e) {
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
        if (e.keyCode === 27) {
            this.setState({ showSettings: false, showDropdown: false });
            this._resetFormValues();
            this.props.clearMembershipErrors();
        }
    }


    // ------------- Event handlers for settings menu -------------

    handleShowSettings(e) {
        e.preventDefault();
        this.setState({ showDropdown: false, showSettings: true });
    }

    handleCloseSettings(e) {
        this.setState({ showSettings: false });
        this._resetFormValues();
        this.props.clearMembershipErrors();
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
        const savedServerId = this.props.server.id;
        this.props.deleteServer(this.props.server.id)
            .then(() => (window.location.href.includes(`/app/servers/${savedServerId}`)) ?
                this.props.history.push("/app/home") : null);
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
                this.setState({ showSettings: false });
                this._resetFormValues();
                this.props.clearMembershipErrors();
            })
            .then(() => this.setState({ updatedServerLoading: false }));
    }


    // ------------- Event handlers for invite show -------------
    handleShowInvite(e) {
        
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


    // ------------- Helper method for resetting form values -------------

    _resetFormValues() {
        this.setState({
            name: this.props.server.name,
            imageUrl: this.props.server.photoUrl,
            imageFile: null
        });
    }


    render() {
        const { server, currentUser, selected, currentServerDetails, firstTextChannelId, error } = this.props
        const { hovered, showDropdown, showSettings, name, imageUrl, updatedServerLoading } = this.state;


        const serverNameShow = (
            <div className="ss-relative-position-anchor">
                <div className="ss-name-show">{server.name}</div>
                <div className="ss-name-show-arrow-left"></div>
            </div>
        );


        const serverDropdown = (
            <div className="ss-options-relative-position-anchor">
                <ul className="ss-dropdown" ref={serverDropdownEl => this.serverDropdownEl = serverDropdownEl}>
                    {currentUser.id === server.ownerId ?
                        <li id="ss-options-settings" onClick={this.handleShowSettings}>Server Settings</li> :
                        <li id="ss-options-leave" onClick={this.handleLeave}>Leave Server</li>
                    }
                    <li id="ss-options-invite" onClick={this.handleShowInvite}>Invite People</li>
                    <li id="ss-options-cancel" onClick={() => this.setState({ showDropdown: false })}>Cancel</li>
                </ul>
            </div>
        );


        const serverSettings = (
            <div className="server-settings-container" id={updatedServerLoading ? "updated-server-loading" : null}>

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

                <div className="ss-hover-bar-relative-position-anchor">
                    <aside className={hovered ? "hovered" : null} id={selected ? "selected" : null}></aside>
                </div>

                <Link to={`/app/servers/${server.id}/${firstTextChannelId}`} onClick={() => currentServerDetails(server.id)}>
                    <li className={selected ? "selected" : null}
                        onMouseEnter={() => this.setState({ hovered: true })}
                        onMouseLeave={() => this.setState({ hovered: false })}
                        onContextMenu={this.handleRightClick}
                        ref={serverIconEl => this.serverIconEl = serverIconEl}
                        style={server.photoUrl === "noPhoto" ? null : { backgroundImage: `url(${server.photoUrl})` }}
                        id={server.photoUrl === "noPhoto" ? null : "server-has-photo"}>
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