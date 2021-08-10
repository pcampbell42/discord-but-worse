import React from "react";
import defaultProfilePicture from "./../../../../app/assets/images/default_profile_picture.png";

class UserSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.props.currentServerDetails(this.props.serverId);
    }

    render() {
        const { users } = this.props;

        return (
            <div className="user-sidebar-container">
                <div className="user-sidebar-header-box"></div>
                <h1>MEMBERS - {users.length}</h1>
                <ul>
                    {users.map(user => 
                        <li key={user.id}>
                            <img src={defaultProfilePicture} />
                            {user.username}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default UserSidebar;