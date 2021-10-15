import { connect } from "react-redux";
import UserShow from "./user_show";
import { createDirectMessage, receiveDirectMessage } from "../../../../actions/direct_message_actions";
import { receiveMessage, deleteMessage, receiveAllMessages } from "../../../../actions/message_actions";
import { receiveUser } from "../../../../actions/user_actions";
import { getDMId } from "../../../../util/selectors";
import { dmExists } from "../../../../util/helpers";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    dmExists: dmExists(state, state.session.id, ownProps.user.id),
    dmId: dmExists(state, state.session.id, ownProps.user.id) ? 
        getDMId(state, state.session.id, ownProps.user.id) : null
});

const mdtp = dispatch => ({
    receiveDirectMessage: directMessage => dispatch(receiveDirectMessage(directMessage)),
    receiveUser: user => dispatch(receiveUser(user)),
    
    createDirectMessage: directMessage => dispatch(createDirectMessage(directMessage)),

    receiveMessage: message => dispatch(receiveMessage(message)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages))
});

export default connect(mstp, mdtp)(UserShow);