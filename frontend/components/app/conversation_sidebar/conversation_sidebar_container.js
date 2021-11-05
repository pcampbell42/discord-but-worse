import { connect } from "react-redux";
import ConversationSidebar from "./conversation_sidebar";
import { getUsersForDms, sortDMs } from "../../../util/selectors";
import { updateDirectMessage } from "../../../actions/direct_message_actions";


const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    directMessages: sortDMs(state),
    users: getUsersForDms(state),
    selectedId: parseInt(window.location.hash.split("/").slice(-1).pop()),
});

const mdtp = dispatch => ({
    updateDirectMessage: directMessage => dispatch(updateDirectMessage(directMessage))
});


export default connect(mstp, mdtp)(ConversationSidebar);