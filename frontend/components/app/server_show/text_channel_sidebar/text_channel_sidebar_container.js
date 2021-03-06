import { connect } from "react-redux";
import TextChannelSidebar from "./text_channel_sidebar";
import { getServerTextChannels } from "../../../../util/selectors";
import { createTextChannel } from "../../../../actions/text_channel_actions";
import { receiveMessage, deleteMessage, receiveAllMessages } from "../../../../actions/message_actions";


const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    server: state.entities.servers[ownProps.serverId],
    textChannels: getServerTextChannels(Object.values(state.entities.textChannels), ownProps.serverId)
});

const mdtp = dispatch => ({
    createTextChannel: textChannel => dispatch(createTextChannel(textChannel)),
    receiveMessage: message => dispatch(receiveMessage(message)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    receiveAllMessages: messages => dispatch(receiveAllMessages(messages))
});

export default connect(mstp, mdtp)(TextChannelSidebar);