import { connect } from "react-redux";
import ServerIconDisplay from "./server_icon_display";

const mstp = state => ({
    currentUser: state.entities.users[state.session.id]
});

const mdtp = dispatch => ({
    // delete membership action (leave server)
    // delete server action (if owner)
    // eventually, update server action (name, avatar) (if owner)
});

export default connect(mstp, mdtp)(ServerIconDisplay);