import { connect } from "react-redux";
import MessageIndex from "./message_index";
import { fetchAllMessages, updateMessage, removeMessage } from "../../../actions/message_actions";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    messages: Object.values(state.entities.messages)
});

const mdtp = dispatch => ({
    fetchAllMessages: () => dispatch(fetchAllMessages()),
    updateMessage: message => dispatch(updateMessage(message)),
    removeMessage: messageId => dispatch(removeMessage(messageId))
});

export default connect(mstp, mdtp)(MessageIndex);