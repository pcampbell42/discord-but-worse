import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login } from "./../../../actions/session_actions";

const mstp = state => ({
    errors: state.errors.session,
    formType: "Login"
});

const mdtp = dispatch => ({
    processForm: formUser => dispatch(login(formUser))
});

export default connect(mstp, mdtp)(SessionForm);