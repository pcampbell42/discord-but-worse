import { connect } from "react-redux";
import ServerShow from "./server_show";
import { currentServerDetails } from "./../../../actions/server_actions";

const mdtp = dispatch => ({
    currentServerDetails: serverId => dispatch(currentServerDetails(serverId))
});

export default connect(null, mdtp)(ServerShow);