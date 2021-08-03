import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signup } from "./../../../actions/session_actions";


const mstp = state => ({
    errors: state.errors.session,
    formType: "Sign Up"
});

const mdtp = dispatch => ({
    processForm: formUser => dispatch(signup(formUser))
});

export default connect(mstp, mdtp)(SessionForm);