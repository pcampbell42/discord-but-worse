import { connect } from "react-redux";
import ServerIconDisplay from "./server_icon_display";
import { updateMembership, deleteMembership, clearMembershipErrors } from "../../../actions/membership_actions";
import { updateServer, deleteServer, currentServerDetails } from "../../../actions/server_actions";
import { getFirstTextChannelId } from "../../../util/selectors";


const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    memberships: state.entities.memberships,
    firstTextChannelId: getFirstTextChannelId(state, ownProps.server.id),
    error: state.errors.memberships
});

const mdtp = dispatch => ({
    updateMembership: membership => dispatch(updateMembership(membership)),
    deleteMembership: membershipId => dispatch(deleteMembership(membershipId)),

    deleteServer: serverId => dispatch(deleteServer(serverId)),
    updateServer: server => dispatch(updateServer(server)),

    currentServerDetails: serverId => dispatch(currentServerDetails(serverId)),
    clearMembershipErrors: () => dispatch(clearMembershipErrors())
});


export default connect(mstp, mdtp)(ServerIconDisplay);