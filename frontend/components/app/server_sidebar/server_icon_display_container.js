import { connect } from "react-redux";
import ServerIconDisplay from "./server_icon_display";
import { deleteMembership } from "../../../actions/membership_actions";
import { deleteServer } from "../../../actions/server_actions";
import { currentServerDetails } from "../../../actions/server_actions";
import { getFirstTextChannelId } from "../../../reducers/selectors/selectors";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    memberships: state.entities.memberships,
    firstTextChannelId: getFirstTextChannelId(state, ownProps.server.id)
});

const mdtp = dispatch => ({
    deleteMembership: membershipId => dispatch(deleteMembership(membershipId)),
    deleteServer: serverId => dispatch(deleteServer(serverId)),
    // eventually, update server action (name, avatar) (if owner)
    currentServerDetails: serverId => dispatch(currentServerDetails(serverId))
});

export default connect(mstp, mdtp)(ServerIconDisplay);