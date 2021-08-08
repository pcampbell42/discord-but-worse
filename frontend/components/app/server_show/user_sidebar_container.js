import { connect } from "react-redux";
import UserSidebar from "./user_sidebar";
import { currentServerUsers } from "../../../reducers/selectors/selectors";
import { currentServerDetails } from "../../../actions/server_actions";

const mstp = (state, ownProps) => ({
    users: currentServerUsers(state, ownProps.serverId)
});

const mdtp = dispatch => ({
    // currentServerDetails: serverId => dispatch(currentServerDetails(serverId))
});

export default connect(mstp, mdtp)(UserSidebar);