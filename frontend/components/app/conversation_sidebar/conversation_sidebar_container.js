import { connect } from "react-redux";
import ConversationSidebar from "./conversation_sidebar";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id]
});

const mdtp = dispatch => ({
    
});

export default connect(mstp, mdtp)(ConversationSidebar);