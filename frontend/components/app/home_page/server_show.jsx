import React from "react";
import { createSubscription } from "./../../../util/websockets_helpers";


class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startHover: false,
            stopHover: false
        };
        this.handleJoin = this.handleJoin.bind(this);
        this.handleStartHover = this.handleStartHover.bind(this);
        this.handleStopHover = this.handleStopHover.bind(this);
    }


    componentWillUnmount() {
        this.props.clearMembershipErrors();
    }


    handleJoin(e) {
        e.preventDefault();

        this.props.createMembership({ server_id: this.props.server.id })
            .then(() => this.props.currentServerDetails(this.props.server.id))
            .then(() => this.props.clearMembershipErrors())
            .then(() => this.props.textChannels.forEach(textChannel =>
                createSubscription("tc", textChannel.id, this.props.receiveAllMessages,
                    this.props.receiveMessage, this.props.deleteMessage)
            ));
    }


    handleStartHover() {
        this.setState({
            stopHover: false,
            startHover: true
        });
    }


    handleStopHover() {
        this.setState({
            startHover: false,
            stopHover: true
        });

        setTimeout(() => this.setState({ stopHover: false }), 200);
    }


    render() {
        const { startHover, stopHover } = this.state;
        const { currentUserServerIds, server, errors } = this.props;

        const serverDisplay = (
            <li className="hp-server-show-container" id={errors[1] === server.id.toString() ? "e" : null}>

                <div style={server.photoUrl === "noPhoto" ? null : { backgroundImage: `url(${server.photoUrl})` }}
                    onMouseEnter={this.handleStartHover}
                    onMouseLeave={this.handleStopHover}
                    id={server.photoUrl === "noPhoto" ? "hp-no-photo" : "home-page-server-photo"}
                    className={startHover ? "hp-start-hover" : stopHover ? "hp-stop-hover" : null}>
                    {server.photoUrl === "noPhoto" ? server.name[0] : null}
                </div>

                <button onClick={this.handleJoin}>Join</button>
                <h2>{server.name}</h2>
                <h3>{errors[1] === server.id.toString() ? errors[0] : null}</h3>
            </li>
        );

        return (
            currentUserServerIds.includes(server.id) ? null : serverDisplay
        );
    }
}


export default ServerShow;