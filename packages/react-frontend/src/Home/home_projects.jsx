import { Link } from 'react-router-dom';

function HomeProjects() {
    return (
        <div className="row">
            <div id="column-2" className="col-sm-6">
                <h3>Projects</h3>
                <p>I have been a part of several incredible opportunities that have made real-world differences. My current project is through the Empower Club at Cal Poly where we are designing a haptic headband to guide a blind marching band through their parade route.</p>
                <Link className="btn" id="button" to="projects">
                    See More...
                </Link>
            </div>
            <div id="projects" className="col-sm-6"></div>
        </div>
    );
}

export default HomeProjects;