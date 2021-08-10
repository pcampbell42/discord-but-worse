import { connect } from "react-redux";
import TextChannelSidebar from "./text_channel_sidebar";
import { getServerTextChannels } from "../../../../reducers/selectors/selectors";
import { createTextChannel } from "../../../../actions/text_channel_actions";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    server: state.entities.servers[ownProps.serverId],
    textChannels: getServerTextChannels(state, ownProps.serverId)
});

const mdtp = dispatch => ({
    createTextChannel: textChannel => dispatch(createTextChannel(textChannel))
});

export default connect(mstp, mdtp)(TextChannelSidebar);