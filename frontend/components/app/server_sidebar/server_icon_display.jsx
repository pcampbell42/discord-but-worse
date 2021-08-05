import React from "react";

class ServerIconDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            showOptions: false
        };
    }

    render() {
        const { server } = this.props

        return (
            <li>
                <Link to="/app">{server.name}</Link>
            </li>
        );
    }
}

export default ServerIconDisplay;