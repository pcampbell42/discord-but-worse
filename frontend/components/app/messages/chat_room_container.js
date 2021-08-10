import { connect } from "react-redux";
import ChatRoom from "./chat_room";
import { receiveMessage, receiveAllMessages, deleteMessage, fetchAllMessages } from "../../../actions/message_actions";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    messages: Object.values(state.entities.messages),
    chatRoomId: window.location.href.includes("servers") ? 
        parseInt(window.location.href.split("/").slice(-1).pop()) :
        null,
    textChannels: state.entities.textChannels
        // put user name ^ (after else) for dms...
});

const mdtp = dispatch => ({
    receiveMessage: message => dispatch(receiveMessage(message)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    fetchAllMessages: () => dispatch(fetchAllMessages())
});

export default connect(mstp, mdtp)(ChatRoom);