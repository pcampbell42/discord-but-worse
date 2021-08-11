import { connect } from "react-redux";
import ServerShow from "./server_show";
import { createMembership, clearMembershipErrors } from "../../../actions/membership_actions";
import { currentUserServerIds } from "../../../reducers/selectors/selectors";
import { currentServerDetails } from "../../../actions/server_actions";
import { receiveMessage, deleteMessage, receiveAllMessages } from "../../../actions/message_actions";



const mstp = state => ({
    currentUserServerIds: currentUserServerIds(state),
    errors: state.errors.memberships,
    textChannels: state.entities.textChannels
});

const mdtp = dispatch => ({
    createMembership: membership => dispatch(createMembership(membership)),
    clearMembershipErrors: () => dispatch(clearMembershipErrors()),
    currentServerDetails: serverId => dispatch(currentServerDetails(serverId)),

    receiveMessage: message => dispatch(receiveMessage(message)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId))
});

export default connect(mstp, mdtp)(ServerShow);