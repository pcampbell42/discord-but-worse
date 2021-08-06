import React from "react";

class ConversationSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="cs-container">
                <div className="cs-header-box"></div>
                <h1>DIRECT MESSAGES</h1>
            </div>
        );
    }
}

export default ConversationSidebar;