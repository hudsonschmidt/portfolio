import { useState, useEffect, useCallback } from 'react';
import { API_BASE, API_KEY } from '../config';
import './projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  // ────────────────────────────────────────────────
  // Fetch & sort projects once on mount
  // ────────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    const getProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects/`, {
          headers: {
            'access_token': API_KEY
          },
          signal: controller.signal
        });
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        const sorted = [...data].sort((a, b) => Number(a.id) - Number(b.id));
        setProjects(sorted);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load projects');
        }
      } finally {
        setLoading(false);
      }
    };

    getProjects();

    return () => controller.abort();
  }, []);

  const toggleExpand = useCallback((projectId) => {
    setExpandedProjectId(prev => (prev === projectId ? null : projectId));
  }, []);

  const handleKeyDown = useCallback((e, projectId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(projectId);
    }
  }, [toggleExpand]);

  const handleImageError = useCallback((e) => {
    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ddd" width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999">No Image</text></svg>';
    e.target.alt = 'Image not available';
  }, []);

  // ────────────────────────────────────────────────
  // UI
  // ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="alert alert-danger">Failed to load projects: {error}</div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading projects...</p>
      </div>
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
            I&apos;ve also added two of my volunteering opportunities as they have both had lasting influences on who I am today.
          </p>
        </aside>

        {/* Main content */}
        <main
          id="project-container"
          className="col-md-9 project-main"
        >
          <div id="project-cards" className="row">
            {projects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <div key={project.id} className="col-md-4 mb-4">
                  <div
                    className={`card ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(project.id)}
                    onKeyDown={(e) => handleKeyDown(e, project.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                  >
                    <img
                      src={project.img}
                      alt={`Screenshot of ${project.name} project`}
                      className="card-img-top"
                      loading="lazy"
                      onError={handleImageError}
                    />

                    <div className="card-body">
                      <h5 className="card-title">{project.name}</h5>
                      <p className="card-date">{project.date}</p>

                      {isExpanded && (
                        <div className="additional-info">
                          <p>{project.desc}</p>
                          <button
                            className="close-button"
                            aria-label="Close project details"
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
