import { connect } from "react-redux";
import ServerIconDisplay from "./server_icon_display";
import { deleteMembership } from "../../../actions/membership_actions";
import { deleteServer } from "../../../actions/server_actions";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    memberships: state.entities.memberships
});

const mdtp = dispatch => ({
    deleteMembership: membershipId => dispatch(deleteMembership(membershipId)),
    deleteServer: serverId => dispatch(deleteServer(serverId)),
    // eventually, update server action (name, avatar) (if owner)
});

export default connect(mstp, mdtp)(ServerIconDisplay);