import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { findMembershipId } from "../../../reducers/selectors/selectors";


class ServerIconDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            showOptions: false
        };

        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleLeaveServer = this.handleLeaveServer.bind(this);
        this.handleDeleteServer = this.handleDeleteServer.bind(this);
    }


    handleRightClick(e) {
        e.preventDefault();
        this.setState({ showOptions: true })
    }


    handleLeaveServer(e) {
        const savedServerId = this.props.server.id;
        const membershipId = findMembershipId(this.props.currentUser.id, this.props.server.id, this.props.memberships);
        this.props.deleteMembership(membershipId)
            .then(() => (window.location.href.includes(`/app/servers/${savedServerId}`)) ?
                this.props.history.push("/app/home") : null);
    }


    handleDeleteServer(e) {
        const savedServerId = this.props.server.id;
        this.props.deleteServer(this.props.server.id)
            .then(() => (window.location.href.includes(`/app/servers/${savedServerId}`)) ?
                        this.props.history.push("/app/home") : null);

    }

    render() {
        const { server, currentUser, selected, currentServerDetails, firstTextChannelId } = this.props

        const serverNameShow = (
            <div className="ss-relative-position-anchor">
                <div className="ss-name-show">{server.name}</div>
                <div className="ss-name-show-arrow-left"></div>
            </div>
        );
        
        const serverOptions = (
            <div className="ss-options-relative-position-anchor">
                <ul className="ss-dropdown">
                    {currentUser.id === server.ownerId ? 
                        <li id="ss-options-delete" onClick={this.handleDeleteServer}>Delete Server</li> : 
                        <li id="ss-options-leave" onClick={this.handleLeaveServer}>Leave Server</li>
                    }
                    <li id="ss-options-cancel" onClick={() => this.setState({ showOptions: false })}>Cancel</li>
                </ul>
            </div>
        );

        return (
            <div>
                <div className="ss-hover-bar-relative-position-anchor">
                    <aside className={this.state.hovered ? "hovered" : null} id={selected ? "selected" : null}></aside>
                </div>

                <Link to={`/app/servers/${server.id}/${firstTextChannelId}`} onClick={() => currentServerDetails(server.id)}>
                    <li className={selected ? "selected" : null} 
                        onMouseEnter={() => this.setState({ hovered: true })}
                        onMouseLeave={() => this.setState({ hovered: false })}
                        onContextMenu={this.handleRightClick}>
                        <div>{server.name[0]}</div>
                    </li>
                </Link>

                {this.state.hovered ? serverNameShow : null}
                {this.state.showOptions ? serverOptions : null}
            </div>
        );
    }
}

// export default ServerIconDisplay;
export default withRouter(ServerIconDisplay);