import React, { useState } from 'react';
import './projects.css';

const Projects = () => {
  const [projects, setRecipes] = useState([
    { id: 1, name: 'Stein Eriksen Collection Websites', image: '../images/stein.jpg' },
    { id: 2, name: 'Bite & Byte', image: '../images/bitebyte.png' },
    { id: 3, name: 'Portfolio Website', image: '../images/portfolio.png' },
    { id: 4, name: 'Haptic Feedback System for Blind Marching Band', image: '../images/empower.jpeg' },
  ]);

  const handleScroll = (e) => {};

  return (
    <div id="projectbody" className="container-fluid">
      <div className="row">
        <div id="sidebar" className="col-md-3 bg-light p-4">
          <h2>Projects</h2>
          <p>
            I have been a part of multiple amazing opportunities that have made real-world 
            differences. My current project is through the Empower Club at Cal Poly where 
            we are designing a haptic headband to guide a blind marching band through 
            their parade route.
          </p>
        </div>

        <div
          id="recipe-container"
          className="col-md-9"
          style={{ overflowY: 'auto', height: 'calc(100vh - 56px)', padding: '20px' }}
          onScroll={handleScroll}
        >
          <div id="recipe-cards" className="row">
            {projects.map((project) => (
              <div key={project.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={project.image} className="card-img-top" alt={project.name} />
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
