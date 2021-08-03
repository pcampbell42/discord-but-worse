import React from "react";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>You are inside the app</h1>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
}

export default HomePage;