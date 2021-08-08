import React from "react";

class TextChannelSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { server } = this.props;

        return (
            <div className="text-channel-container">
                <div className="text-channel-header-box">{server ? server.name : null}</div>
                <h1>TEXT CHANNELS</h1>
            </div>
        );
    }
}

export default TextChannelSidebar;