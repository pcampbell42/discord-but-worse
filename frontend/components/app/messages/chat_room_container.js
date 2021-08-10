import { connect } from "react-redux";
import ChatRoom from "./chat_room";
import { receiveMessage, receiveAllMessages, deleteMessage, fetchAllMessages } from "../../../actions/message_actions";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    messages: Object.values(state.entities.messages),
});

const mdtp = dispatch => ({
    receiveMessage: message => dispatch(receiveMessage(message)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    fetchAllMessages: () => dispatch(fetchAllMessages())
});

export default connect(mstp, mdtp)(ChatRoom);