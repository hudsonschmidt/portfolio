import { useState } from "react";
import { Link } from 'react-router-dom';
import "./nav.css";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" data-cy="home-name" href="/">
          Hudson Schmidt
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="experience" onClick={() => setIsOpen(false)}>Experience</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="projects" onClick={() => setIsOpen(false)}>Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="education" onClick={() => setIsOpen(false)}>Education</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="resume" onClick={() => setIsOpen(false)}>Resume</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <a id="profile" className="nav-link" href="https://www.linkedin.com/in/hudson-schmidt" target="_blank" rel="noopener noreferrer">
            <img src="./images/linkedin.png" alt="Linkedin Logo" width="30" height="30" className="rounded-circle"/>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;