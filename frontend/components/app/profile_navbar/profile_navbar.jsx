import React from "react";
import { Link } from "react-router-dom";
import logoutIcon from "../../../../app/assets/images/logout_icon.png"
import homeIcon from "../../../../app/assets/images/home_icon.png"
import defaultProfilePicture from "../../../../app/assets/images/default_profile_picture.png"


class ProfileNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeHovered: false,
            logoutHovered: false,
            showCopied: false
        };

        this.handleUsernameClick = this.handleUsernameClick.bind(this);
    }


    handleUsernameClick() {
        navigator.clipboard.writeText(`${this.props.currentUser.username}#${this.props.currentUser.usernameId}`);
        this.setState({ showCopied: true });
        setTimeout(() => this.setState({ showCopied: false }), 1500);
    }


    render() {
        const { currentUser } = this.props

        const homeTooltipShow = (
            <div className="pn-home-relative-position-anchor">
                <div className="pn-home-tooltip-show">Home</div>
                <div className="pn-home-arrow-down"></div>
            </div>
        );

        const logoutTooltipShow = (
            <div className="pn-logout-relative-position-anchor">
                <div className="pn-logout-tooltip-show">Logout</div>
                <div className="pn-logout-arrow-down"></div>
            </div>
        );

        const copiedMessage = (
            <div className="pn-copied-relative-position-anchor">
                <div className="pn-copied-tooltip-show">Copied!</div>
                <div className="pn-copied-arrow-down"></div>
            </div>
        )

        return (
            <div className="pn-container">

                <div className="pn-left-container">
                    <img className="pn-profile-pic" src={defaultProfilePicture} />

                    <div className="pn-username" 
                        onClick={this.handleUsernameClick}>
                        <h2>{currentUser.username}</h2>
                        <h3>#{currentUser.usernameId}</h3>
                    </div>

                    {this.state.showCopied ? copiedMessage : null}
                </div>

                <div className="pn-right-container">

                    <Link to="/">
                        <div className="pn-home-icon-container"
                            onMouseEnter={() => this.setState({ homeHovered: true })}
                            onMouseLeave={() => this.setState({ homeHovered: false })}>
                            <img src={homeIcon} />
                        </div>
                    </Link>
                    {this.state.homeHovered ? homeTooltipShow : null}


                    <div className="pn-logout-icon-container" onClick={this.props.logout} 
                        onMouseEnter={() => this.setState({ logoutHovered: true })}
                        onMouseLeave={() => this.setState({ logoutHovered: false })}>
                        <img src={logoutIcon} />
                    </div>
                    {this.state.logoutHovered ? logoutTooltipShow : null}

                </div>
            </div>
        );
    }
}


export default ProfileNavbar;
