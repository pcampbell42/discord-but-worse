import React from "react";
import ServerIconDisplayContainer from "./server_icon_display_container";
import NewServerFormContainer from "./new_server_form_container";

class ServersSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        };
    }

    componentDidMount() {
        this.props.fetchCurrentUserDetails(this.props.currentUser.id);
    }
    
    // Might have to move the entire form component in here if this update thing doesnt work
    // componentDidUpdate() {
    //     this.setState({ showForm: false })
    // }

    render() {
        return (
            <div className="server-sidebar-container">
                {this.state.showForm ? <NewServerFormContainer /> : null}
                <ul>
                    {this.props.userServers.map(server => <ServerIconDisplayContainer key={server.id} server={server} />)}
                </ul>
                <button onClick={() => this.setState({ showForm: true })}>Create Server</button>
            </div>
        );
    }
}

export default ServersSideBar;