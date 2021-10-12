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
        const { selectedId } = this.state;
        const { users, directMessages, currentUser } = this.props;
        

        return (
            <div className="cs-container">
                <div className="cs-header-box"></div>
                <h1>DIRECT MESSAGES</h1>

                <ul>
                    {directMessages.map(directMessage =>
                        <li key={directMessage.id} className={selectedId === directMessage.id ? "selected" : null}
                            onClick={() => this.setState({ selectedId: directMessage.id })}>

                            {directMessage.user1Id === currentUser.id ?

                                <Link to={`/app/home/conversations/${directMessage.id}`}>
                                    <img src={users[directMessage.user2Id].photoUrl === "noPhoto" ? 
                                                    defaultProfilePicture : users[directMessage.user2Id].photoUrl} />
                                    {users[directMessage.user2Id].username}
                                </Link> :

                                <Link to={`/app/home/conversations/${directMessage.id}`}>
                                    <img src={users[directMessage.user1Id].photoUrl === "noPhoto" ? 
                                                    defaultProfilePicture : users[directMessage.user1Id].photoUrl} />
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