import HomeBody from "./body"
import HomeAbout from "./home_about"
import HomeExperience from './home_experience';
import HomeProjects from './home_projects';
import HomeEducation from './home_education';
import "./main.css";
import "./col.css";


function Home() {
  return (
    <div id = "body" className="container-fluid">
      <HomeBody />
      <HomeAbout />
      <HomeExperience />
      <HomeProjects />
      <HomeEducation />
    </div>
  );
}

export default Home;
