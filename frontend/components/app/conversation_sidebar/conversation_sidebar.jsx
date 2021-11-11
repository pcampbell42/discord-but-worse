import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import defaultProfilePicture from "./../../../../app/assets/images/default_profile_picture.png";


class ConversationSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: props.selectedId,
            convoHovered: undefined
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleHideDM = this.handleHideDM.bind(this);
    }


    handleClick(e, id) {
        e.target.className === "dm-hide-button" ? null : this.setState({ selectedId: id });
    }


    handleHideDM(id, user1) {
        user1 ?
            this.props.updateDirectMessage({ id: id, user1_hidden: true }) :
            this.props.updateDirectMessage({ id: id, user2_hidden: true });

        // Handling redirect
        let url = window.location.hash.split("/");
        if (url[url.length - 2] === "conversations" && url[url.length - 1] === id.toString())
            this.props.history.push("/app/home");
    }


    render() {
        const { selectedId, convoHovered } = this.state;
        const { users, directMessages, currentUser } = this.props;

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
                                <li key={directMessage.id} onClick={e => this.handleClick(e, directMessage.id)}
                                    className={selectedId === directMessage.id && !noneSelected ? "selected" : null}>

                                    {convoHovered === directMessage.id ?
                                        <div className="dm-hide-button" onClick={() => this.handleHideDM(directMessage.id, 
                                            directMessage.user1Id === currentUser.id ? true : false)}
                                            onMouseEnter={() => this.setState({ convoHovered: directMessage.id })}
                                            onMouseLeave={() => this.setState({ convoHovered: undefined })}>x</div> : null
                                    }

                                    {directMessage.user1Id === currentUser.id ?

                                        <Link to={`/app/home/conversations/${directMessage.id}`} 
                                            onMouseEnter={() => this.setState({ convoHovered: directMessage.id })}
                                            onMouseLeave={() => this.setState({ convoHovered: undefined })}>
                                            <img src={users[directMessage.user2Id].photoUrl === "noPhoto" ? 
                                                            defaultProfilePicture : users[directMessage.user2Id].photoUrl} />
                                            {users[directMessage.user2Id].username}
                                        </Link> :

                                        <Link to={`/app/home/conversations/${directMessage.id}`}
                                            onMouseEnter={() => this.setState({ convoHovered: directMessage.id })}
                                            onMouseLeave={() => this.setState({ convoHovered: undefined })}>
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


export default withRouter(ConversationSidebar);