import { connect } from "react-redux";
import UserSidebar from "./user_sidebar";
import { currentServerUsers } from "../../../../util/selectors";

const mstp = (state, ownProps) => ({
    users: currentServerUsers(state, ownProps.serverId),
    server: state.entities.servers[ownProps.serverId]
});

export default connect(mstp)(UserSidebar);