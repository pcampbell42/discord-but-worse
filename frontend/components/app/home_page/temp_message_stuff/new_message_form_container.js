import { connect } from "react-redux";
import NewMessageForm from "./new_message_form";
import { createMessage } from "../../../../actions/message_actions";

// const mstp = state => ({
//     currentUser: state.entities.users[state.session.id]
// });

const mdtp = dispatch => ({
    createMessage: message => dispatch(createMessage(message))
});

export default connect(null, mdtp)(NewMessageForm);