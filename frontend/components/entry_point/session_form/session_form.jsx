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
        const header = (
                this.props.formType === "Login" ?
                    <div>
                        <h1>Welcome back!</h1>
                        <h2>We're so excited to see you again!</h2>
                    </div>
                    :
                    <div className="create-account-header-container">
                        <h1>Create an account</h1>
                    </div>
        );

        const usernameInput = (
            <label>USERNAME
                <input type="text" onChange={this.update("username")} value={this.state.username} />
            </label>
        );

        let formId;
        this.props.formType === "Sign Up" ? formId = "signup" : formId = "login"
        
        return (
            <div className="entry-container">
                <EntryHeader />

                <div className="session-form-container" id={formId}>
                    <form className="session-form" onSubmit={this.handleSubmit}>
                        {header}

                        {this.props.formType === "Sign Up" ? usernameInput : null}

                        <label>EMAIL
                            <input type="text" onChange={this.update("email")} value={this.state.email} />
                        </label>

                        <label>PASSWORD
                            <input type="password" onChange={this.update("password")} value={this.state.password} />
                        </label>

                        <input className="form-submit" type="submit" value={this.props.formType} />

                        <ul>{this.props.errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>

                        {this.props.formType === "Login" ?
                            <h3>Need an account? <Link to="/signup">Register</Link></h3> :
                            <h3><Link to="/login">Already have an account?</Link></h3>
                        }

                    </form>
                    {this.props.formType === "Login" ?
                        <div className="demo-account-container">
                            <div onClick={this.demoAccountLogin}>Demo Account</div>
                        </div> :
                        null
                    }
                    
                </div>
            </div>
        );
    }
}

export default SessionForm;