import { connect } from "react-redux";
import ProfileNavbar from "./profile_navbar";
import { logout } from "./../../../actions/session_actions";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id]
});

const mdtp = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mstp, mdtp)(ProfileNavbar);