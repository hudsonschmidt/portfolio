import React, { useState, useEffect } from 'react';
import './projects.css';

export const API_BASE = import.meta.env.VITE_API_BASE;
export const API_KEY  = import.meta.env.VITE_API_KEY;

const ProgressiveImage = ({ src, placeholder, children }) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const loading = currentSrc !== src;

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setCurrentSrc(src);
  }, [src]);

  return children(currentSrc, loading);
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  // ────────────────────────────────────────────────
  // Fetch & sort projects once on mount
  // ────────────────────────────────────────────────
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects/?api_key=${API_KEY}`);
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        const sorted = [...data].sort((a, b) => Number(a.id) - Number(b.id));
        setProjects(sorted);
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

  // ────────────────────────────────────────────────
  // UI
  // ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="alert alert-danger">Failed to load projects: {error}</div>
    );
  }

  return (
    <div id="projectbody" className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <aside id="sidebar" className="col-md-3 bg-light p-4">
          <h2>Projects</h2>
          <p>
            I have been a part of several incredible opportunities that have made real-world
            differences. My current project is through the Empower Club at Cal Poly where
            we are designing a haptic headband to guide a blind marching band through
            their parade route.
            <br />
            I've also added two of my volunteering opportunities as they have both had lasting influences on who I am today.
          </p>
        </aside>

        {/* Main content */}
        <main
          id="project-container"
          className="col-md-9"
          style={{
            overflowY: 'auto',
            height: 'calc(100vh - 56px)',
            padding: '20px',
            position: 'relative',
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
                    {/* Progressive image 🔽 */}
                    <ProgressiveImage src={project.img} placeholder={project.thumb}>
                      {(src, loading) => (
                        <img
                          src={src}
                          alt={project.name}
                          className={`card-img-top ${loading ? 'blur' : 'sharp'}`}
                          loading="lazy"
                        />
                      )}
                    </ProgressiveImage>

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