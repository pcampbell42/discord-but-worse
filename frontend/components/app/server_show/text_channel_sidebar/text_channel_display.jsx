import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import settingsIcon from "../../../../../app/assets/images/settings_icon.png"

class TextChannelDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSettings: false,
            closeSettings: false,
            hovered: false,
            editHovered: false,
            name: props.textChannel.name
        }

        this.update = this.update.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
    }


    componentDidMount() {
        document.addEventListener("keydown", this.handleEscape, true);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscape, true);
    }


    handleEscape(e) {
        if (e.keyCode === 27) {
            this.setState({ closeSettings: true, name: this.props.textChannel.name });
            setTimeout(() => this.setState({ showSettings: false, closeSettings: false }), 150);
        }
    }


    update(e) {
        this.setState({ name: e.currentTarget.value });
    }


    handleReset(e) {
        e.preventDefault();
        this.setState({ name: this.props.textChannel.name });
    }


    handleClose() {
        this.setState({ closeSettings: true, name: this.props.textChannel.name });
        setTimeout(() => this.setState({ showSettings: false, closeSettings: false }), 150);
    }


    handleDelete(e) {
        this.setState({ closeSettings: true });
        setTimeout(() => {
            this.props.deleteTextChannel(this.props.textChannel.id)
                .then(() => {
                    this.props.history.push(`/app/servers/${this.props.server.id}/${this.props.textChannels[0].id}`);
                });
        }, 150);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ closeSettings: true });
        setTimeout(() => 
            this.props.updateTextChannel({ id: this.props.textChannel.id, name: this.state.name })
                .then(() => {
                    this.setState({ name: this.props.textChannel.name, closeSettings: false, showSettings: false });
                })
        , 150);
    }


    render() {
        const { closeSettings, showSettings, hovered, editHovered, name } = this.state;
        const { textChannel, server, selected, currentUser } = this.props;

        const settingsButton = (
            <div className="tc-name-hover-relative-position-anchor">
                <div className="tc-name-hover-container">
                    <img src={settingsIcon} onClick={() => this.setState({ editHovered: false, showSettings: true })}
                        onMouseEnter={() => this.setState({ editHovered: true })}
                        onMouseLeave={() => this.setState({ editHovered: false })}></img>
                </div>
            </div>
        );

        const settingsTooltip = (
            <div className="ts-settings-relative-position-anchor">
                <div className="ts-settings-tooltip-show">Edit Channel</div>
                <div className="ts-settings-arrow-down"></div>
            </div>
        );

        const textChannelSettings = (
            <div className="tc-settings-container" id={closeSettings ? "tc-settings-closing" : null}>

                <div className="tc-settings-cancel-button">
                    <div className="tc-settings-x-button" onClick={this.handleClose}>x</div>
                    <p>ESC</p>
                </div>

                <div className="tc-settings-left">
                    <ul>
                        <li>Overview</li>
                        <li className="tc-settings-delete-button" onClick={this.handleDelete}>Delete Channel</li>
                    </ul>
                </div>

                <div className="tc-settings-right">
                    <h1>OVERVIEW</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>CHANNEL NAME
                            <input type="text" value={name} onChange={this.update} />
                        </label>

                        <div>
                            <section onClick={this.handleReset}>Reset</section>
                            <input id={name === "" ? "tc-settings-invalid" : null} className="tc-settings-save-changes" type="submit" value="Save Changes" />
                        </div>
                    </form>
                </div>
            </div>
        );

        return (
            showSettings ? textChannelSettings : (
                <li className={selected ? "selected" : null}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}>

                    <Link to={`/app/servers/${server.id}/${textChannel.id}`}>
                        <h1>#</h1>
                        <h3>{textChannel.name}</h3>
                    </Link>

                    {(hovered || selected) && currentUser.id === server.ownerId ?
                        settingsButton : null
                    }

                    {editHovered ? settingsTooltip : null}
                </li>
            )
        );
    }
}

// export default TextChannelDisplay;
export default withRouter(TextChannelDisplay);
