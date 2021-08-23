import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signup, clearSessionErrors } from "./../../../actions/session_actions";

const mstp = state => ({
    errors: state.errors.session,
    formType: "Sign Up"
});

const mdtp = dispatch => ({
    processForm: formUser => dispatch(signup(formUser)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mstp, mdtp)(SessionForm);