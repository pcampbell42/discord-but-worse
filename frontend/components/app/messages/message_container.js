import { connect } from "react-redux";
import Message from "./message";
import { createDirectMessage, receiveDirectMessage } from "../../../actions/direct_message_actions";
import { receiveMessage, deleteMessage, receiveAllMessages } from "../../../actions/message_actions";
import { receiveUser } from "../../../actions/user_actions";
import { getDMId } from "../../../util/selectors";
import { dmExists } from "../../../util/helpers";

const mstp = (state, ownProps) => ({
    dmExists: dmExists(state, state.session.id, ownProps.message.authorId),
    dmId: dmExists(state, state.session.id, ownProps.message.authorId) ?
        getDMId(state, state.session.id, ownProps.message.authorId) : null
});

const mdtp = dispatch => ({
    receiveDirectMessage: directMessage => dispatch(receiveDirectMessage(directMessage)),
    receiveUser: user => dispatch(receiveUser(user)),

    createDirectMessage: directMessage => dispatch(createDirectMessage(directMessage)),

    receiveMessage: message => dispatch(receiveMessage(message)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages))
});

export default connect(mstp, mdtp)(Message);