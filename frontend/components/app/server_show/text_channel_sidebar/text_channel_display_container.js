import { connect } from "react-redux";
import TextChannelDisplay from "./text_channel_display";
import { updateTextChannel, deleteTextChannel } from "../../../../actions/text_channel_actions";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id]
});

const mdtp = dispatch => ({
    updateTextChannel: textChannel => dispatch(updateTextChannel(textChannel)),
    deleteTextChannel: textChannelId => dispatch(deleteTextChannel(textChannelId))
});

export default connect(mstp, mdtp)(TextChannelDisplay);