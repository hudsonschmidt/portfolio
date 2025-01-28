import React from "react";
import { Link } from 'react-router-dom';

function HomeProjects() {
    return (
        <div class="row">
            <div id="column-2" class="col-sm-6">
                <h3>Projects</h3>
                <p>I have been apart of multiple amazing opportunities that have made real-world differences. My current project is through the Empower Club at Cal Poly where we are designing a haptic headband to guide a blind marching band through their parade route.</p>
                <Link className="btn" id="button" to="projects">
                    See More...
                </Link>
            </div>
            <div id="projects" class="col-sm-6"></div>
        </div>
    );
}

export default HomeProjects;