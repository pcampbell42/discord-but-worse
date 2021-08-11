import { connect } from "react-redux";
import Loading from "./loading";

import { fetchCurrentUserDetails } from "../../actions/session_actions";


const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    textChannels: state.entities.textChannels,
    // all dms as well...
});

const mdtp = dispatch => ({
    fetchCurrentUserDetails: currentUserId => dispatch(fetchCurrentUserDetails(currentUserId))
});

export default connect(mstp, mdtp)(Loading);