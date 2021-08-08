import React from "react";
import ServerShowContainer from "./server_show_container";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllServers();
    }

    // componentWillUnmount() {
    //     // Refetch current user servers? To remove excess servers from store...
    // }

    render() {
        const { servers } = this.props;
        return (
            <div className="hp-container">
                <div className="hp-header-box"><h1>Server Discovery</h1></div>
                
                <ul>
                    {servers.map(server => <ServerShowContainer key={server.id} server={server}/>)}
                </ul>
            </div>
        );
    }
}

export default HomePage;