import React from "react";

class NewMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            // authorId: props.currentUser.id
            // messageable_id and type from url...?
        };
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(e) {
        this.setState({ ["body"]: e.currentTarget.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createMessage(this.state)
            .then(() => this.setState({ body: "" }));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.body} onChange={this.update} />
                <input type="submit" value="post" />
            </form>
        );
    }
}

export default NewMessageForm;