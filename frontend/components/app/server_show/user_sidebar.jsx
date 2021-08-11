import React from "react";
import defaultProfilePicture from "./../../../../app/assets/images/default_profile_picture.png";
import crownIcon from "./../../../../app/assets/images/crown_icon.png";
import usersIcon from "./../../../../app/assets/images/users_icon.png"

class UserSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            hiddenHovered: false
        };
    }

    render() {
        const { users, server } = this.props;

        const sidebarToggle = (
            <div>
                <img className="users-toggle" src={usersIcon} 
                    onMouseEnter={() => this.setState({ hiddenHovered: true })} 
                    onMouseLeave={() => this.setState({ hiddenHovered: false })}/>

            </div>
        );

        return (
            this.state.hidden ? sidebarToggle : 
                <div className="user-sidebar-container">
                    <div className="user-sidebar-header-box"></div>
                    {/* {sidebarToggle} */}

                    <h1>MEMBERS - {users.length}</h1>
                    <ul>
                        {users.map(user => 
                            <li key={user.id}>
                                <img src={defaultProfilePicture} />
                                {user.username}
                                {user.id === server.ownerId ? <img className="king-icon" src={crownIcon} /> : null}
                            </li>
                        )}
                    </ul>

                </div>
        );
    }
}

export default UserSidebar;