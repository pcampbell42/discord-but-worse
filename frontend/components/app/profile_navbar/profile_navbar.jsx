import React from "react";
import { Link } from "react-router-dom";
import logoutIcon from "../../../../app/assets/images/logout_icon.png";
import homeIcon from "../../../../app/assets/images/home_icon.png";


class ProfileNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeHovered: false,
            logoutHovered: false,
            profilePictureHovered: false,
            showCopied: false
        };

        this.handleUsernameClick = this.handleUsernameClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleUsernameClick() {
        navigator.clipboard.writeText(`${this.props.currentUser.username}#${this.props.currentUser.usernameId}`);
        this.setState({ showCopied: true });
        setTimeout(() => this.setState({ showCopied: false }), 1500);
    }


    handleSubmit(e) {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.currentTarget.files[0];

        // Callback that happens when readAsDataUrl(file) below completes successfully.
        // Dispatches updateUser thunk action.
        reader.onloadend = () => {
            const formData = new FormData();
            formData.append("id", this.props.currentUser.id);
            if (file) formData.append("user[photo]", file);

            this.props.updateUser(formData);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }


    render() {
        const { currentUser } = this.props;
        const { homeHovered, logoutHovered, profilePictureHovered, showCopied } = this.state;

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

        const profilePictureTooltip = (
            <div className="pn-profile-picture-relative-position-anchor">
                <div className="pn-profile-picture-tooltip-show">Change <br/> Profile Pic</div>
                <div className="pn-profile-picture-arrow-down"></div>
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

                    <label className="pn-profile-pic"
                           onMouseEnter={() => this.setState({ profilePictureHovered: true })}
                           onMouseLeave={() => this.setState({ profilePictureHovered: false })}
                           onClick={() => this.setState({ profilePictureHovered: false })}
                           id={currentUser.photoUrl === "noPhoto" ? null : "has-photo"}
                           style={currentUser.photoUrl === "noPhoto" ? null : { backgroundImage: `url(${currentUser.photoUrl})` }}>
                        <input className="change-profile-pic-input" type="file" onChange={this.handleSubmit}/>
                    </label>
                    {profilePictureHovered ? profilePictureTooltip : null}

                    <div className="pn-username"
                        onClick={this.handleUsernameClick}>
                        <h2>{currentUser.username}</h2>
                        <h3>#{currentUser.usernameId}</h3>
                    </div>

                    {showCopied ? copiedMessage : null}
                </div>

                <div className="pn-right-container">

                    <Link to="/">
                        <div className="pn-home-icon-container"
                            onMouseEnter={() => this.setState({ homeHovered: true })}
                            onMouseLeave={() => this.setState({ homeHovered: false })}>
                            <img src={homeIcon} />
                        </div>
                    </Link>
                    {homeHovered ? homeTooltipShow : null}


                    <div className="pn-logout-icon-container" onClick={this.props.logout}
                        onMouseEnter={() => this.setState({ logoutHovered: true })}
                        onMouseLeave={() => this.setState({ logoutHovered: false })}>
                        <img src={logoutIcon} />
                    </div>
                    {logoutHovered ? logoutTooltipShow : null}

                </div>
            </div>
        );
    }
}


export default ProfileNavbar;
