import { connect } from "react-redux";
import ProfileNavbar from "./profile_navbar";
import { logout } from "./../../../actions/session_actions";
import { updateUser } from "./../../../actions/user_actions";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id]
});

const mdtp = dispatch => ({
    logout: () => dispatch(logout()),
    updateUser: formData => dispatch(updateUser(formData))
});

export default connect(mstp, mdtp)(ProfileNavbar);