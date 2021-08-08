import { connect } from "react-redux";
import TextChannelSidebar from "./text_channel_sidebar";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    server: state.entities.servers[ownProps.serverId]
    // textChannels
});

const mdtp = dispatch => ({
    // ...
});

export default connect(mstp, mdtp)(TextChannelSidebar);