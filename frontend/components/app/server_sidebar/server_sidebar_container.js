import { connect } from "react-redux";
import ServerSidebar from "./server_sidebar";
import { fetchCurrentUserDetails } from "../../../actions/session_actions";
import { createServer } from "../../../actions/server_actions";
import { currentUserServers } from "../../../reducers/selectors/selectors";
import { clearMembershipErrors } from "../../../actions/membership_actions";
import { currentServerDetails } from "../../../actions/server_actions";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    userServers: currentUserServers(state),
    error: state.errors.memberships,
    textChannels: Object.values(state.entities.textChannels),
    homeSelected: ( window.location.hash === "#/app/home" ? true : false )
});

const mdtp = dispatch => ({
    fetchCurrentUserDetails: currentUserId => dispatch(fetchCurrentUserDetails(currentUserId)),
    createServer: server => dispatch(createServer(server)),
    clearMembershipErrors: () => dispatch(clearMembershipErrors()),
    currentServerDetails: serverId => dispatch(currentServerDetails(serverId))
});

export default connect(mstp, mdtp)(ServerSidebar);