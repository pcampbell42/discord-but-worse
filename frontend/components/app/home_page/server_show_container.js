import { connect } from "react-redux";
import ServerShow from "./server_show";
import { createMembership } from "../../../actions/membership_actions";
import { currentUserServerIds } from "../../../reducers/selectors/selectors";

const mstp = state => ({
    currentUserServerIds: currentUserServerIds(state)
});

const mdtp = dispatch => ({
    createMembership: membership => dispatch(createMembership(membership))
});

export default connect(mstp, mdtp)(ServerShow);