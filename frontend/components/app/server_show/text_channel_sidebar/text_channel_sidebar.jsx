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
            closeForm: false,
            name: ""
        };
        
        this.update = this.update.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        document.addEventListener("keydown", this.handleEscape, true);
        document.addEventListener("click", this.handleClick, true);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscape, true);
        document.removeEventListener("click", this.handleClick, true);
    }


    update(e) {
        this.setState({ name: e.currentTarget.value })
    }


    handleClick(e) {
        if (e.target.className === "ts-create-form-relative-position-anchor") {
            this.handleClose(e);
        }
    }


    handleEscape(e) {
        if (e.keyCode === 27) {
            this.handleClose(e);
        }
    }


    handleClose(e) {
        e.preventDefault();
        this.setState({ closeForm: true });
        setTimeout(() => this.setState({ name: "", closeForm: false, showForm: false }), 100);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.createTextChannel({ name: this.state.name, server_id: this.props.server.id })
            .then(() => {
                this.setState({ name: "", closeForm: true });
                createSubscription("tc", this.props.textChannels[this.props.textChannels.length - 1].id,
                    this.props.receiveAllMessages, this.props.receiveMessage,
                    this.props.deleteMessage);
                setTimeout(() => {
                    this.setState({ showForm: false, closeForm: false });
                    this.props.history.push(`/app/servers/${this.props.server.id}/${this.props.textChannels[this.props.textChannels.length - 1].id}`)
                }, 100)
            });
    }


    render() {
        const { createHovered, showForm, closeForm, name } = this.state;
        const { server, currentUser, textChannels } = this.props;

        const createTooltip = (
            <div className="ts-create-relative-position-anchor">
                <div className="ts-create-tooltip-show">Create Channel</div>
                <div className="ts-create-arrow-down"></div>
            </div>
        );

        const createTextChannelForm = (
            <div className="ts-create-form-relative-position-anchor" id={closeForm ? "ts-create-background-closing" : null}>
                <div id={closeForm ? "ts-create-closing" : null}>
                    <button onClick={this.handleClose}>x</button>
                    <h4>Create Text Channel</h4>

                    <form onSubmit={name === "" ? null : this.handleSubmit}>
                        <label>CHANNEL NAME
                            <input type="text" value={name} onChange={this.update} placeholder="# new-channel"/>
                        </label>
                        <footer>
                            <span></span>
                            <input id={name === "" ? "ts-invalid" : null} className="ts-submit-button" type="submit" value="Create Channel" />
                        </footer>
                    </form>
                </div>
            </div>
        );

        return (
            server ? (
                <div className="text-channel-container">
                    {showForm ? createTextChannelForm : null}
                    <div className="text-channel-header-box">{server ? server.name : null}</div>

                    <div>
                        <h1>TEXT CHANNELS</h1>
                        {currentUser.id === server.ownerId ? 
                            <h2 onMouseEnter={() => this.setState({ createHovered: true })}
                                onMouseLeave={() => this.setState({ createHovered: false })}
                                onClick={() => this.setState({ showForm: true })}>+</h2> 
                                : null}
                    </div>
                    {createHovered ? createTooltip : null}

                    <ul>
                        {textChannels.map(textChannel => 
                            <TextChannelDisplayContainer key={textChannel.id} textChannel={textChannel} server={server} 
                                selected={(window.location.hash === `#/app/servers/${server.id}/${textChannel.id}` ? 
                                    true : false)}  textChannels={textChannels} />
                        )}
                    </ul>
                </div> 
            ) : <div></div>
        );
    }
}

// export default TextChannelSidebar;
export default withRouter(TextChannelSidebar);
