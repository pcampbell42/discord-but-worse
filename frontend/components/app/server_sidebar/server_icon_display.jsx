import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { findMembershipId } from "../../../reducers/selectors/selectors";


class ServerIconDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            showDropdown: false,
            showSettings: false,
            name: props.server.name
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
    }


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


    handleOutsideClick(e) {
        if (!this.node.contains(e.target)) {
            this.setState({ showDropdown: false, name: this.props.server.name });
        }
    }


    handleOutsideRightClick(e) {
        if (!this.node2.contains(e.target)) {
            this.setState({ showDropdown: false, name: this.props.server.name });

        }
    }


    handleEscape(e) {
        if (e.keyCode === 27) {
            this.setState({ showSettings: false, showDropdown: false, name: this.props.server.name });
            this.props.clearMembershipErrors();
        }
    }


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


    handleDelete(e) {
        const savedServerId = this.props.server.id;
        this.props.deleteServer(this.props.server.id)
            .then(() => (window.location.href.includes(`/app/servers/${savedServerId}`)) ?
                        this.props.history.push("/app/home") : null);
    }


    handleShowSettings(e) {
        e.preventDefault();
        this.setState({ showDropdown: false, showSettings: true });
    }


    handleCloseSettings(e) {
        this.setState({ showSettings: false, name: this.props.server.name });
        this.props.clearMembershipErrors();
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.updateServer({ id: this.props.server.id, name: this.state.name })
            .then(() => {
                this.setState({ name: this.props.server.name, showSettings: false })
                this.props.clearMembershipErrors();
            });
    }


    handleReset(e) {
        e.preventDefault();
        this.setState({ name: this.props.server.name });
    }

    
    update(e) {
        this.setState({ name: e.currentTarget.value });
    }


    render() {
        const { server, currentUser, selected, currentServerDetails, firstTextChannelId, error } = this.props

        const serverNameShow = (
            <div className="ss-relative-position-anchor">
                <div className="ss-name-show">{server.name}</div>
                <div className="ss-name-show-arrow-left"></div>
            </div>
        );
        
        const serverDropdown = (
            <div className="ss-options-relative-position-anchor">
                <ul className="ss-dropdown" ref={node => this.node = node}>
                    {currentUser.id === server.ownerId ?
                        <li id="ss-options-settings" onClick={this.handleShowSettings}>Server Settings</li> :
                        <li id="ss-options-leave" onClick={this.handleLeave}>Leave Server</li>
                    }
                    <li id="ss-options-cancel" onClick={() => this.setState({ showDropdown: false })}>Cancel</li>
                </ul>
            </div>
        );

        const serverSettings = (
            <div className="server-settings-container">

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
                                <div className="server-settings-image-upload"><p>{server.name[0]}</p></div>
                                <h2>Upload Image</h2>
                            </div>

                            <label id={error.length > 0 ? "server-settings-error" : null}>
                                SERVER NAME <span>{error.length > 0 ? `- ${error}` : null}</span>
                                <input type="text" value={this.state.name} onChange={this.update} />
                            </label>
                        </div>


                        <div>
                            <section onClick={this.handleReset}>Reset</section>
                            <input id={this.state.name === "" ? "server-settings-invalid" : null} className="server-settings-save-changes" type="submit" value="Save Changes" />
                        </div>
                    </form>
                </div>
            </div>
        );


        return (
            <div>
                {this.state.showSettings ? serverSettings : null}

                <div className="ss-hover-bar-relative-position-anchor">
                    <aside className={this.state.hovered ? "hovered" : null} id={selected ? "selected" : null}></aside>
                </div>

                <Link to={`/app/servers/${server.id}/${firstTextChannelId}`} onClick={() => currentServerDetails(server.id)}>
                    <li className={selected ? "selected" : null} 
                        onMouseEnter={() => this.setState({ hovered: true })}
                        onMouseLeave={() => this.setState({ hovered: false })}
                        onContextMenu={this.handleRightClick}
                        ref={node2 => this.node2 = node2}>
                        <div>{server.name[0]}</div>
                    </li>
                </Link>

                {this.state.hovered ? serverNameShow : null}
                {this.state.showDropdown ? serverDropdown : null}
            </div>
        );
    }
}


export default withRouter(ServerIconDisplay);