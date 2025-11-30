import { Link } from 'react-router-dom';

function HomeExperience() {
  return (
    <div className="row">
      <div id="experience" className="col-sm-6"></div>
      <div id="column-2" className="col-sm-6">
        <h3>Experience</h3>
        <p>Apart from babysitting, I have spent most of my working life in restaurants. I also had the amazing opportunity to be an orientation leader for the freshmen at Cal Poly at the beginning of my second year.</p>
        <Link className="btn" id="button" to="experience">
          See More...
        </Link>
      </div>
    </div>
  );
}

export default HomeExperience;