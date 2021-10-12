import { connect } from "react-redux";
import ConversationSidebar from "./conversation_sidebar";
import { getUsersForDms } from "../../../util/selectors";


const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    directMessages: Object.values(state.entities.directMessages).reverse(),
    users: getUsersForDms(state),
    selectedId: parseInt(window.location.hash.split("/").slice(-1).pop())
});


export default connect(mstp)(ConversationSidebar);