import React, { useState, useEffect } from 'react';
import './projects.css';

export const API_BASE = import.meta.env.VITE_API_BASE;
export const API_KEY  = import.meta.env.VITE_API_KEY;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects/?api_key=${API_KEY}`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    getProjects();
  }, []);

  const toggleExpand = (projectId) => {
    setExpandedProjectId(prev => (prev === projectId ? null : projectId));
  };

  if (error) {
    return (
      <div className="alert alert-danger">
        Failed to load projects: {error}
      </div>
    );
  }

  return (
    <div id="projectbody" className="container-fluid">
      <div className="row">
        <aside id="sidebar" className="col-md-3 bg-light p-4">
          <h2>Projects</h2>
          <p>
            I have been a part of several incredible opportunities that have made real-world
            differences. My current project is through the Empower Club at Cal Poly where
            we are designing a haptic headband to guide a blind marching band through
            their parade route.
            <br></br>
            I've also added two of my volunteering opportunities as they have both had lasting influences on who I am today.
          </p>
        </aside>

        <main
          id="project-container"
          className="col-md-9"
          style={{
            overflowY: 'auto',
            height: 'calc(100vh - 56px)',
            padding: '20px',
            position: 'relative'
          }}
        >
          <div id="project-cards" className="row">
            {projects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <div key={project.id} className="col-md-4 mb-4">
                  <div
                    className={`card ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(project.id)}
                  >
                    <img
                      src={project.img}
                      className="card-img-top"
                      alt={project.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{project.name}</h5>
                      <p className="card-date">{project.date}</p>
                      {isExpanded && (
                        <div className="additional-info">
                          <p>{project.desc}</p>
                          <button
                            className="close-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedProjectId(null);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;