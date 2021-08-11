import React from "react";
import { withRouter } from "react-router";
import TextChannelDisplayContainer from "./text_channel_display_container";
import { createSubscription } from "../../../../util/websockets_helpers";


class TextChannelSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createHovered: false,
            showForm: false,
            name: ""
        };
        
        this.update = this.update.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    update(e) {
        this.setState({ name: e.currentTarget.value })
    }


    handleClose(e) {
        e.preventDefault();
        this.setState({ name: "", showForm: false });
    }


    handleSubmit(e) {
        e.preventDefault();

        this.props.createTextChannel({ name: this.state.name, server_id: this.props.server.id })
            .then(() => this.setState({ name: "", showForm: false }))
            .then(() => createSubscription("tc", this.props.textChannels[this.props.textChannels.length - 1].id, 
                                                    this.props.receiveAllMessages, this.props.receiveMessage,
                                                    this.props.deleteMessage))
            .then(() => this.props.history.push(`/app/servers/${this.props.server.id}/${this.props.textChannels[this.props.textChannels.length - 1].id}`));
    }


    render() {
        const { server, currentUser, textChannels } = this.props;

        const createTooltip = (
            <div className="ts-create-relative-position-anchor">
                <div className="ts-create-tooltip-show">Create Channel</div>
                <div className="ts-create-arrow-down"></div>
            </div>
        );

        const createTextChannelForm = (
            <div className="ts-create-form-relative-position-anchor">
                <div>
                    <button onClick={this.handleClose}>x</button>
                    <h4>Create Text Channel</h4>

                    <form onSubmit={this.state.name === "" ? null : this.handleSubmit}>
                        <label>CHANNEL NAME
                            <input type="text" value={this.state.name} onChange={this.update} placeholder="# new-channel"/>
                        </label>
                        <footer>
                            <span></span>
                            <input id={this.state.name === "" ? "ts-invalid" : null} className="ts-submit-button" type="submit" value="Create Channel" />
                        </footer>
                    </form>
                </div>
            </div>
        );

        return (
            server ? (
                <div className="text-channel-container">

                    {this.state.showForm ? createTextChannelForm : null}

                    <div className="text-channel-header-box">{server ? server.name : null}</div>

                    <div>
                        <h1>TEXT CHANNELS</h1>
                        {currentUser.id === server.ownerId ? 
                            <h2 onMouseEnter={() => this.setState({ createHovered: true })}
                                onMouseLeave={() => this.setState({ createHovered: false })}
                                onClick={() => this.setState({ showForm: true })}>+</h2> 
                                : null}
                    </div>
                    {this.state.createHovered ? createTooltip : null}

                    <ul>
                        {textChannels.map(textChannel => 
                            <TextChannelDisplayContainer key={textChannel.id} textChannel={textChannel} server={server} 
                                selected={(window.location.hash === `#/app/servers/${server.id}/${textChannel.id}` ? 
                                    true : false)} />
                        )}
                    </ul>

                </div> 
            ) : <div></div>
        );
    }
}

// export default TextChannelSidebar;
export default withRouter(TextChannelSidebar);
