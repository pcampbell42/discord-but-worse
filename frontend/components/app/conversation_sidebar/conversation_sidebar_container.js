import { connect } from "react-redux";
import ConversationSidebar from "./conversation_sidebar";
import { getUsersForDms, sortDMs } from "../../../util/selectors";


const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    directMessages: sortDMs(state),
    users: getUsersForDms(state),
    selectedId: parseInt(window.location.hash.split("/").slice(-1).pop()),
});


export default connect(mstp)(ConversationSidebar);