import React from "react";
import { Link } from "react-router-dom";
import EntryHeader from "../entry_header";


class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoAccountLogin = this.demoAccountLogin.bind(this);
    }

    update(field) {
        return e => (
            this.setState({ [field]: e.currentTarget.value })
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    }

    demoAccountLogin(e) {
        this.props.processForm({
            username: "demo123",
            email: "demo123@email.com",
            password: "123456"
        });
    }

    render() {
        const { formType, errors, clearSessionErrors } = this.props; // Destructuring props


        // -------------------- Form header --------------------

        const header = (
                formType === "Login" ?
                    <div>
                        <h1>Welcome back!</h1>
                        <h2>We're so excited to see you again!</h2>
                    </div>
                    :
                    <div className="create-account-header-container">
                        <h1>Create an account</h1>
                    </div>
        );


        // -------------------- Checking for errors --------------------

        let usernameError;
        let passwordError;
        let emailError;
        for (let i = 0; i < errors.length; i++) {
            if (errors[i].includes("Username")) {
                usernameError = errors[i];
            } else if (errors[i].includes("mail")) {
                emailError = errors[i];
            } else if (errors[i].includes("Password")) {
                passwordError = errors[i];
            }
        }


        // -------------------- Input for username --------------------

        const usernameInput = (
            <label id={usernameError ? "error" : "no-error"}>USERNAME {usernameError ? ` - ${usernameError}` : null}
                <input type="text" onChange={this.update("username")} value={this.state.username} />
            </label>
        );


        // -------------------- Setting form id based on form type for css --------------------

        let formId;
        formType === "Sign Up" ? formId = "signup" : formId = "login"


        // -------------------- Rendering form --------------------
        
        return (
            <div className="entry-container">
                <EntryHeader clearSessionErrors={clearSessionErrors}/>

                <div className="session-form-container" id={formId}>
                    <form className="session-form" onSubmit={this.handleSubmit}>
                        {header}

                        {formType === "Sign Up" ? usernameInput : null}
                        <label id={emailError ? "error" : "no-error"}>EMAIL {emailError ? ` - ${emailError}` : null}
                            <input type="text" onChange={this.update("email")} value={this.state.email} />
                        </label>
                        <label id={passwordError ? "error" : "no-error"}>PASSWORD {passwordError ? ` - ${passwordError}` : null}
                            <input type="password" onChange={this.update("password")} value={this.state.password} />
                        </label>

                        <input className="form-submit" type="submit" value={formType} />

                        {/* <ul>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul> */}

                        {formType === "Login" ?
                            <h3>Need an account? <Link to="/signup" onClick={clearSessionErrors}>Register</Link></h3> :
                            <h3><Link to="/login" onClick={clearSessionErrors}>Already have an account?</Link></h3>
                        }
                    </form>

                    {formType === "Login" ?
                        <div className="demo-account-container">
                            <div onClick={this.demoAccountLogin}>Demo Account</div>
                        </div> : null
                    }
                </div>
            </div>
        );
    }
}

export default SessionForm;