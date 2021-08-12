import { connect } from "react-redux";
import Loading from "./loading";
import { fetchCurrentUserDetails } from "../../actions/session_actions";
import { receiveMessage, deleteMessage, receiveAllMessages } from "../../actions/message_actions";


const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    textChannels: Object.values(state.entities.textChannels),
    directMessages: Object.values(state.entities.directMessages)
});


const mdtp = dispatch => ({
    fetchCurrentUserDetails: currentUserId => dispatch(fetchCurrentUserDetails(currentUserId)),

    receiveMessage: message => dispatch(receiveMessage(message)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId))
});


export default connect(mstp, mdtp)(Loading);
