import { connect } from "react-redux";
import ConversationSidebar from "./conversation_sidebar";
import { getUsersForDms } from "../../../util/selectors";


const mstp = state => {
    let x = {
    currentUser: state.entities.users[state.session.id],
    directMessages: Object.values(state.entities.directMessages).reverse(),
    users: getUsersForDms(state),
    selectedId: parseInt(window.location.hash.split("/").slice(-1).pop()),
}
return x;
};


export default connect(mstp)(ConversationSidebar);