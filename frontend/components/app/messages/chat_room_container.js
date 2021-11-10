import { connect } from "react-redux";
import ChatRoom from "./chat_room";
import { getMessagesForChannel } from "../../../util/selectors";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
    messages: getMessagesForChannel(state),

    chatRoomType: window.location.href.includes("servers") ? "tc" : "dm",

    chatRoomObj: window.location.href.includes("servers") ? 
        state.entities.textChannels[ownProps.channelId] :
        state.entities.directMessages[parseInt(window.location.hash.split("/").slice(-1).pop())]
});

export default connect(mstp)(ChatRoom);