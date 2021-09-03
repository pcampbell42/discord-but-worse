import { connect } from "react-redux";
import HomePage from "./home_page";
import { fetchAllServers } from "../../../actions/server_actions";
import { clearMembershipErrors } from "../../../actions/membership_actions";

const mstp = state => ({
    servers: Object.values(state.entities.servers)
});

const mdtp = dispatch => ({
    fetchAllServers: () => dispatch(fetchAllServers()),
    clearMembershipErrors: () => dispatch(clearMembershipErrors()),
});

export default connect(mstp, mdtp)(HomePage);