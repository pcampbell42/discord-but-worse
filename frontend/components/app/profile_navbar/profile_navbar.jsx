import React from "react";
import { Link } from "react-router-dom";

import CopiedUsernameAlert from "./copied_username_alert";

import logoutIcon from "../../../../app/assets/images/logout_icon.png"
import homeIcon from "../../../../app/assets/images/home_icon.png"
import defaultProfilePicture from "../../../../app/assets/images/default_profile_picture.png"

class ProfileNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeHovered: false,
            logoutHovered: false
        };
    }

    render() {
        const { currentUser } = this.props

        const homeTooltipShow = (
            <div className="pn-home-relative-position-anchor">
                <div className="pn-home-tooltip-show">Home</div>
            </div>
        );

        const logoutTooltipShow = (
            <div className="pn-logout-relative-position-anchor">
                <div className="pn-logout-tooltip-show">Logout</div>
            </div>
        );

        return (
            <div className="pn-container">

                <div className="pn-left-container">
                    <img className="pn-profile-pic" src={defaultProfilePicture} />
                    <div className="pn-username" onClick={() => navigator.clipboard.writeText(`${currentUser.username}#${currentUser.usernameId}`)}>
                        <h2>{currentUser.username}</h2>
                        <h3>#{currentUser.usernameId}</h3>
                    </div>
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