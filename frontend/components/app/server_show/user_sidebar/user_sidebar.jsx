import React from "react";
import UserShowContainer from "./user_show_container";


class UserSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { users, server } = this.props;

        return (
                <div className="user-sidebar-container">
                    <div className="user-sidebar-header-box"></div>

                    <h1>MEMBERS - {users.length}</h1>
                    <ul>{users.map(user => <UserShowContainer key={user.id} user={user} server={server} />)}</ul>
                </div>
        );
    }
}


export default UserSidebar;