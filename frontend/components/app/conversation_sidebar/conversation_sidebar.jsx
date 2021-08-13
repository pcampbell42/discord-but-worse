import React from "react";
import { Link } from "react-router-dom";
import defaultProfilePicture from "./../../../../app/assets/images/default_profile_picture.png";


class ConversationSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: props.selectedId
        };
    }


    render() {
        const { users, directMessages, currentUser, selectedId } = this.props;

        return (
            <div className="cs-container">
                <div className="cs-header-box"></div>
                <h1>DIRECT MESSAGES</h1>

                <ul>
                    {directMessages.map(directMessage => 
                        <li key={directMessage.id} className={selectedId === directMessage.id ? "selected" : null}>
                            {directMessage.user1Id === currentUser.id ?

                                <Link to={`/app/home/conversations/${directMessage.id}`}>
                                    <img src={defaultProfilePicture} />
                                    {users[directMessage.user2Id].username}
                                </Link> :

                                <Link to={`/app/home/conversations/${directMessage.id}`}>
                                    <img src={defaultProfilePicture} />
                                    {users[directMessage.user1Id].username}
                                </Link>
                            }
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}


export default ConversationSidebar;