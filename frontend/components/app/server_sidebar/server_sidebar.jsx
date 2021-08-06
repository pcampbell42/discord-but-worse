import React from "react";
import { Link } from "react-router-dom";
import ServerIconDisplayContainer from "./server_icon_display_container";
import NewServerFormContainer from "./new_server_form_container";
import discordLogo from "../../../../app/assets/images/discord_logo.png"

class ServersSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            homeHovered: false,
            createHovered: false,
            name: ""
        };
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchCurrentUserDetails(this.props.currentUser.id);
    }

    update(e) {

    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.
    }

    render() {
        const homeTooltipShow = (
            <div className="ss-home-relative-position-anchor">
                <div className="ss-home-tooltip-show">Server Discovery</div>
            </div>
        );

        const createTooltipShow = (
            <div className="ss-create-relative-position-anchor">
                <div className="ss-create-tooltip-show">Create a Server</div>
            </div>
        );

        const createServerForm = (
            <form onSubmit={this.handleSubmit}>
                <label>SERVER NAME
                    <input type="text" value={this.state.name} />
                    <input type="submit" value="CREATE SERVER" />
                </label>
            </form>
        );

        return (
            <div className="ss-container">
                {this.state.showForm ? <NewServerFormContainer /> : null}

                <div className="ss-buffer"></div>

                <Link to="/app/home" onMouseEnter={() => this.setState({ homeHovered: true })}
                        onMouseLeave={() => this.setState({ homeHovered: false })}>
                    <div className="ss-logo-container"><img src={discordLogo} /></div>
                </Link>
                {this.state.homeHovered ? homeTooltipShow : null}

                <ul>
                    {this.props.userServers.map(server => <ServerIconDisplayContainer key={server.id} server={server} />)}
                </ul>

                <button onClick={() => this.setState({ showForm: true })}
                        onMouseEnter={() => this.setState({ createHovered: true })}
                        onMouseLeave={() => this.setState({ createHovered: false })}>
                    +
                </button>
                {this.state.createHovered ? createTooltipShow : null}
            </div>
        );
    }
}

export default ServersSideBar;