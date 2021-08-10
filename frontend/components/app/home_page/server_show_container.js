import { connect } from "react-redux";
import ServerShow from "./server_show";
import { createMembership, clearMembershipErrors } from "../../../actions/membership_actions";
import { currentUserServerIds } from "../../../reducers/selectors/selectors";
import { currentServerDetails } from "../../../actions/server_actions";

const mstp = state => ({
    currentUserServerIds: currentUserServerIds(state),
    errors: state.errors.memberships
});

const mdtp = dispatch => ({
    createMembership: membership => dispatch(createMembership(membership)),
    clearMembershipErrors: () => dispatch(clearMembershipErrors()),
    currentServerDetails: serverId => dispatch(currentServerDetails(serverId))
});

export default connect(mstp, mdtp)(ServerShow);