import { Link } from 'react-router-dom';

function HomeEducation() {
  return (
    <div className="row">
      <div id="education" className="col-sm-6"></div>
      <div id="column-2" className="col-sm-6">
        <h3>Education</h3>
        <p>Throughout high school, I took many AP classes, concurrent enrollment classes, and computer science classes. All of which have put me ahead in my current education at Cal Poly where I have been an academic senior since the start of my second year.</p>
        <Link className="btn" id="button" to="education">
          See More...
        </Link>
      </div>
    </div>
  );
}

export default HomeEducation;