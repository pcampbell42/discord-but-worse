import React from "react";
import { Link } from "react-router-dom";

import discordLogo from "../../../app/assets/images/discord_logo.png"
import githubLogo from "../../../app/assets/images/github_logo.png";
import linkedinLogo from "../../../app/assets/images/linkedin_logo.png";
import angelListLogo from "../../../app/assets/images/angel_list_logo.png";

const EntryHeader = props => (
    <header className="ep-header">
        <Link className="ep-header-left" to="/" onClick={props.clearSessionErrors}>
            <img src={discordLogo} />
            <h1>Discord<sub>(but worse)</sub></h1>
        </Link>

        <div className="ep-header-right">
            <a href="https://github.com/pcampbell42"><img src={githubLogo} /></a>
            <a href="https://www.mmo-champion.com/content/"><img src={linkedinLogo}/></a>
            <a href="https://pcampbell42.github.io/the_arena/"><img src={angelListLogo} /></a>
        </div>
    </header>
);

export default EntryHeader;