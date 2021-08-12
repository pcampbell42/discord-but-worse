import { connect } from "react-redux";
import MessageForm from "./message_form";

const mstp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users, // selector here maybe?

    chatRoomType: window.location.href.includes("servers") ? "tc" : "dm",

    chatRoomObj: window.location.href.includes("servers") ?
        state.entities.textChannels[parseInt(window.location.hash.split("/").slice(-1).pop())] :
        state.entities.directMessages[parseInt(window.location.hash.split("/").slice(-1).pop())]
});

export default connect(mstp)(MessageForm);