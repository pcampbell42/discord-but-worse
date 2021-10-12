import { connect } from "react-redux";
import ServerSidebar from "./server_sidebar";
import { fetchCurrentUserDetails } from "../../../actions/session_actions";
import { createServer } from "../../../actions/server_actions";
import { currentUserServers } from "../../../util/selectors";
import { clearMembershipErrors } from "../../../actions/membership_actions";
import { currentServerDetails } from "../../../actions/server_actions";
import { receiveMessage, deleteMessage, receiveAllMessages } from "../../../actions/message_actions";


const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    userServers: currentUserServers(state),
    error: state.errors.memberships,
    homeSelected: (window.location.hash.includes("#/app/home") ? true : false),
    textChannels: Object.values(state.entities.textChannels),
    directMessages: Object.values(state.entities.directMessages)
});

const mdtp = dispatch => ({
    fetchCurrentUserDetails: currentUserId => dispatch(fetchCurrentUserDetails(currentUserId)),
    createServer: server => dispatch(createServer(server)),
    clearMembershipErrors: () => dispatch(clearMembershipErrors()),
    currentServerDetails: serverId => dispatch(currentServerDetails(serverId)),

    receiveMessage: message => dispatch(receiveMessage(message)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId))
});

export default connect(mstp, mdtp)(ServerSidebar);