import React from "react";
import { Link } from "react-router-dom";
import settingsIcon from "../../../../../app/assets/images/settings_icon.png"

class TextChannelDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            hovered: false,
            editHovered: false,
            name: props.textChannel.name
        }
    }


    render() {
        const { textChannel, server, selected, currentUser } = this.props;

        const settingsButton = (
            <div className="tc-name-hover-relative-position-anchor">
                <div className="tc-name-hover-container">
                    <img src={settingsIcon} onClick={() => this.setState({ showForm: true })}
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
            <div className="tc-settings-container">

            </div>
        );

        return (
            this.state.showForm ? textChannelSettings : (
                <li className={selected ? "selected" : null}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}>

                    <Link to={`/app/servers/${server.id}/${textChannel.id}`}>
                        <h1>#</h1>
                        <h3>{textChannel.name}</h3>
                    </Link>

                    {(this.state.hovered || selected) && currentUser.id === server.ownerId ?
                        settingsButton : null
                    }

                    {this.state.editHovered ? settingsTooltip : null}
                </li>
            )
        );
    }
}

export default TextChannelDisplay;