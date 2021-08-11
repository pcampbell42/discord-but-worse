import { connect } from "react-redux";
import ChatRoom from "./chat_room";
import { getMessagesForChannel } from "../../../reducers/selectors/selectors";
// import { receiveMessage, receiveAllMessages, deleteMessage, fetchAllMessages } from "../../../actions/message_actions";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    messages: getMessagesForChannel(state),



    chatRoomId: window.location.href.includes("servers") ? 
        ownProps.channelId :
        null,
    textChannels: state.entities.textChannels
        // put user name ^ (after else) for dms...
});

const mdtp = dispatch => ({
    // receiveMessage: message => dispatch(receiveMessage(message)),
    // receiveAllMessages: messages => dispatch(receiveAllMessages(messages)),
    // deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    // fetchAllMessages: () => dispatch(fetchAllMessages())
});

export default connect(mstp, mdtp)(ChatRoom);