import { connect } from "react-redux";
import ConversationSidebar from "./conversation_sidebar";
import { getUsersForDms } from "../../../reducers/selectors/selectors";


const mstp = state => ({
    currentUser: state.entities.users[state.session.id],
    directMessages: Object.values(state.entities.directMessages),
    users: getUsersForDms(state),
    selectedId: parseInt(window.location.hash.split("/").slice(-1).pop())
});


export default connect(mstp)(ConversationSidebar);