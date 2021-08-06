import React from "react";

class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleJoin = this.handleJoin.bind(this);
    }

    handleJoin(e) {
        e.preventDefault();
        this.props.createMembership({ server_id: this.props.server.id })
    }

    render() {
        const { currentUserServerIds, server } = this.props;

        const serverDisplay = (
            <li className="hp-server-show-container">
                <div>{server.name[0]}</div>
                <button onClick={this.handleJoin}>Join</button>
                <h2>{server.name}</h2>
            </li>
        );

        return (
            currentUserServerIds.includes(server.id) ? null : serverDisplay
        );
    }
}

export default ServerShow;