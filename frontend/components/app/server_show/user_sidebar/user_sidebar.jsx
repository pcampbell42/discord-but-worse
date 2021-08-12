import React from "react";
import UserShowContainer from "./user_show_container";
import usersIcon from "./../../../../../app/assets/images/users_icon.png";

class UserSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // hidden: false,
            // hiddenHovered: false
        };
    }

    render() {
        const { users, server } = this.props;

        // const sidebarToggle = (
        //     <div>
        //         <img className="users-toggle" src={usersIcon} 
        //             onMouseEnter={() => this.setState({ hiddenHovered: true })} 
        //             onMouseLeave={() => this.setState({ hiddenHovered: false })}/>

        //     </div>
        // );

        return (
            this.state.hidden ? sidebarToggle : 
                <div className="user-sidebar-container">
                    <div className="user-sidebar-header-box"></div>
                    {/* {sidebarToggle} */}

                    <h1>MEMBERS - {users.length}</h1>
                    <ul>
                        {users.map(user => <UserShowContainer key={user.id} user={user} server={server} />)}
                    </ul>

                </div>
        );
    }
}

export default UserSidebar;