import React from "react";
import { Link } from "react-router-dom";
import ServerIconDisplayContainer from "./server_icon_display_container";
import discordLogo from "../../../../app/assets/images/discord_logo.png";
import imageUploadIcon from "../../../../app/assets/images/image_upload_icon.png";


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

    componentWillUnmount() {
        this.props.clearMembershipErrors();
    }

    update(e) {
        this.setState({ name: e.currentTarget.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createServer({ name: this.state.name })
            .then(() => this.setState({ name: "", showForm: false }));
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
            <div className="ss-create-form-relative-position-anchor">
                <div>
                    <button onClick={() => this.setState({ name: "", showForm: false })}>x</button>
                    <div>
                        <h1>Customize your server</h1>
                        <h2>Give your server a personality with a name and an icon. You can always change it later.</h2>
                        <button>
                            <img src={imageUploadIcon} />
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <label>SERVER NAME
                            <input type="text" value={this.state.name} onChange={this.update} 
                                    placeholder={`${this.props.currentUser.username}'s server`} />
                        </label>
                        <footer>
                            <span>
                                {this.props.error}
                            </span>
                            <input className="ss-submit-button" type="submit" value="Create" />
                        </footer>
                    </form>
                </div>
            </div> 
        );

        return (
            <div className="ss-container">
                {this.state.showForm ? createServerForm : null}

                <div className="ss-buffer"></div>

                <Link to="/app/home" onMouseEnter={() => this.setState({ homeHovered: true })}
                        onMouseLeave={() => this.setState({ homeHovered: false })}>
                    <div className="ss-logo-container"><img src={discordLogo} /></div>
                </Link>
                {this.state.homeHovered ? homeTooltipShow : null}

                <ul className="ss-servers">
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