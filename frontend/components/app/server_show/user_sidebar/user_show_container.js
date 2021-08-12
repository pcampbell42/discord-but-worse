import { connect } from "react-redux";
import UserShow from "./user_show";
import { createDirectMessage } from "../../../../actions/direct_message_actions";
import { receiveMessage, deleteMessage, receiveAllMessages } from "../../../../actions/message_actions";
import { dmExists, getDMId } from "../../../../reducers/selectors/selectors";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    dmExists: dmExists(state, state.session.id, ownProps.user.id),
    dmId: dmExists(state, state.session.id, ownProps.user.id) ? 
        getDMId(state, state.session.id, ownProps.user.id) : null
});

const mdtp = dispatch => ({
    createDirectMessage: directMessage => dispatch(createDirectMessage(directMessage)),
    receiveMessage: message => dispatch(receiveMessage(message)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages))
});

export default connect(mstp, mdtp)(UserShow);