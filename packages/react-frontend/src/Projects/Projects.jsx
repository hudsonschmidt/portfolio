import React, { useState } from 'react';
import './projects.css';

const Projects = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'Azores Ecological Survey',
      date: 'July 2022 - July 2022',
      image: '/images/stein.jpg',
      description: 'I spent two weeks in the Azores Islands, off the coast of Portugal, conducting underwater surveys aimed at marine conservation. This opportunity was organized by the Padma Organization (a volunteer non-profit) in collaboration with Conservation Diver and Dive Azores, in partnership with the University of the Azores. Our team surveyed reefs just outside an established protected area to show that marine biodiversity there was as diverse as within the boundaries. The resulting report was submitted to the Portuguese government as evidence to support expanding the protected zone to help protect these vibrant marine ecosystems for the future.',
    },
    {
      id: 2,
      name: 'Stein Eriksen Collection Websites',
      date: 'January 2023 - May 2023',
      image: '/images/stein.jpg',
      description: 'I collaborated with the HR team for the Stein Eriksen Collection to redesign all their websites, helping one of the premier hotels at Deer Valley refresh its online presence and appeal to a younger audience. I created wireframes and a clickable prototype that were instrumental in shaping the current website design. The redesign was successfully implemented, with the final design closely following the original wireframes and design suggestions I provided, resulting in a modernized and engaging online experience.',
    },
    {
      id: 3,
      name: 'Manta Ray Conservation in Bali',
      date: 'July 2023 - July 2023',
      image: '/images/stein.jpg',
      description: 'I spent two weeks in Bali and Komodo National Park, dividing my time between marine conservation and environmental cleanup efforts. For one week, I lived on a sailboat, exploring diverse ecosystems and participating in garbage collection on remote islands—particularly important in Indonesia as they are one of the world’s top plastic polluters. The following week was dedicated to manta ray conservation on Nusa Lembongan, an island off the coast of Bali. We free-dived at reef “cleaning stations” to photograph each manta’s unique belly markings, enabling Blue Corner Marine Research to track and monitor their health and whereabouts. This work was arranged by the Padma Organization and carried out in collaboration with the non-profits Conservation Diver and Blue Corner Marine Research.',
    },
    {
      id: 4,
      name: 'Bite & Byte',
      date: 'October 2024 - December 2024',
      image: '/images/bitebyte.png',
      description: 'As the software lead in a team of five, I played a key role in developing a responsive and intuitive web application using React. The application was designed to store and display recipes efficiently, leveraging a backend database for seamless data management. To ensure data security and privacy, we implemented a login and registration system that generates unique tokens for user authentication. My primary responsibility was leading the frontend development and design, ensuring a user-friendly interface that enhances the overall user experience. Through effective collaboration and problem-solving, our team successfully created a well-designed, functional, and secure platform for recipe management.',
    },
    {
      id: 5,
      name: 'Portfolio Website',
      date: 'January 2025 - February 2025',
      image: '/images/portfolio.png',
      description: 'I started building my idea for a portfolio website in August of 2023 in straight HTML and CSS however once I went back to school, it fell abandoned. Then following my software engineering class where I learned how to create and deploy a website using React I picked up where I left off and worked to create an environment where I can showcase all I have been able to acomplish and what I am currently working on. I built this entire website using React jsx and CSS on VSCode and made it modular so it is easy to add information in the future.',
    },
    {
      id: 6,
      name: 'Haptic Feedback System for Blind Marching Band',
      date: 'December 2024 - Current',
      image: '/images/empower.jpeg',
      description: 'I am currently the software lead spearheading the conceptualization and overall system design of an innovative haptic feedback solution aimed at enabling visually impaired musicians to march independently in parades. We are developing software for a laptop to communicate via Bluetooth Low Energy (BLE) with a series of ESP32 microcontrollers, which relay instructions to four haptic motors sewn into the headbands of the musicians. Throughout the project, we are working through the end-to-end prototyping, testing, and iterative refinement process, utilizing CAD tools and programming to enhance system reliability, functionality, and user experience based on real-world feedback.',
    },
  ]);

  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const toggleExpand = (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
    }
  };

  const handleScroll = (e) => {
  };

  return (
    <div id="projectbody" className="container-fluid">
      <div className="row">
        <div id="sidebar" className="col-md-3 bg-light p-4">
          <h2>Projects</h2>
          <p>
            I have been a part of several incredible opportunities that have made real-world
            differences. My current project is through the Empower Club at Cal Poly where
            we are designing a haptic headband to guide a blind marching band through
            their parade route.
            <br></br>
            I've also added two of my volunteering opportunities as they have both had lasting influences on who I am today.
          </p>
        </div>

        <div
          id="project-container"
          className="col-md-9"
          style={{
            overflowY: 'auto',
            height: 'calc(100vh - 56px)',
            padding: '20px',
            position: 'relative' 
          }}
          onScroll={handleScroll}
        >
          <div id="project-cards" className="row">
            {projects.map((project) => {
              const isExpanded = expandedProjectId === project.id;

              return (
                <div key={project.id} className="col-md-4 mb-4">
                  {/* Card */}
                  <div
                    className={`card ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(project.id)}
                  >
                    {/* Image */}
                    <img
                      src={project.image}
                      className="card-img-top"
                      alt={project.name}
                    />
                    {/* Card Body */}
                    <div className="card-body">
                      <h5 className="card-title">{project.name}</h5>
                      <p className="card-date">{project.date}</p>

                      {/* If expanded, show additional info + close button */}
                      {isExpanded && (
                        <div className="additional-info">
                          <p>{project.description}</p>

                          <button
                            className="close-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedProjectId(null);
                            }}
                          >Close</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
