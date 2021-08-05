import { connect } from "react-redux";
import ServerSidebar from "./server_sidebar";
import { fetchCurrentUserDetails } from "../../../actions/session_actions";
import { currentUserServers } from "../../../reducers/selectors/selectors";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    userServers: currentUserServers(state)
});

const mdtp = dispatch => ({
    fetchCurrentUserDetails: currentUserId => dispatch(fetchCurrentUserDetails(currentUserId))
    // create server action
});

export default connect(mstp, mdtp)(ServerSidebar);