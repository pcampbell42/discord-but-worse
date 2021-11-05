import React from "react";
import { Link } from "react-router-dom";
import defaultProfilePicture from "./../../../../app/assets/images/default_profile_picture.png";


class ConversationSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: props.selectedId,
            convoHovered: undefined
        };
    }


    render() {
        const { selectedId, convoHovered } = this.state;
        const { users, directMessages, currentUser, updateDirectMessage } = this.props;

        // Weird bug fix - when navigating to home server index, conversation stayed selected
        // because prop doesn't seem to update correctly. This isn't an ideal fix, but it works
        let noneSelected = false;
        if (window.location.hash.split("/").slice(-1).pop() === "home") noneSelected = true;

        return (
            <div className="cs-container">
                <div className="cs-header-box"></div>
                <h1>DIRECT MESSAGES</h1>

                <ul>
                    {directMessages.map(directMessage => 
                        (directMessage.user2Id !== currentUser.id && users[directMessage.user2Id] === undefined) ||
                        (directMessage.user1Id !== currentUser.id && users[directMessage.user1Id] === undefined) ? null : 
                        
                            (directMessage.user1Id === currentUser.id && directMessage.user1Hidden) ||
                            (directMessage.user2Id === currentUser.id && directMessage.user2Hidden) ? null :
                                <li key={directMessage.id} onClick={() => this.setState({ selectedId: directMessage.id })}
                                    className={selectedId === directMessage.id && !noneSelected ? "selected" : null}>

                                    {directMessage.user1Id === currentUser.id ?

                                        <Link to={`/app/home/conversations/${directMessage.id}`} 
                                            onMouseEnter={() => this.setState({ convoHovered: directMessage.id })}
                                            onMouseLeave={() => this.setState({ convoHovered: undefined })}>
                                            <img src={users[directMessage.user2Id].photoUrl === "noPhoto" ? 
                                                            defaultProfilePicture : users[directMessage.user2Id].photoUrl} />
                                            {users[directMessage.user2Id].username}

                                            {convoHovered === directMessage.id ? 
                                                <div className="dm-hide-button" onClick={() => updateDirectMessage({ id: directMessage.id,  user1_hidden: true})}>x</div>
                                                : null
                                            }
                                        </Link> :

                                        <Link to={`/app/home/conversations/${directMessage.id}`}
                                            onMouseEnter={() => this.setState({ convoHovered: directMessage.id })}
                                            onMouseLeave={() => this.setState({ convoHovered: undefined })}>
                                            <img src={users[directMessage.user1Id].photoUrl === "noPhoto" ? 
                                                            defaultProfilePicture : users[directMessage.user1Id].photoUrl} />
                                            {users[directMessage.user1Id].username}

                                            {convoHovered === directMessage.id ?
                                                <div className="dm-hide-button" onClick={() => updateDirectMessage({ id: directMessage.id, user2_hidden: true })}>x</div>
                                                : null
                                            }
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