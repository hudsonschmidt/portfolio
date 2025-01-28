import React from "react";
import { Link } from 'react-router-dom';
import "./nav.css";

function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" data-cy="home-name" href="/">
                Hudson Schmidt
            </a>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="experience">Experience</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="projects">Projects</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="education">Education</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="resume">Resume</Link>
                    </li>
                </ul>
            </div>
            <div class="d-flex">
                <a id="profile" class="nav-link" href="https://www.linkedin.com/in/hudson-schmidt" target="new" rel="noopener noreferrer">
                    <img src="./images/linkedin.png" alt="Linkedin Logo" width="30" height="30" class="rounded-circle"/>
                </a>
            </div>
        </div>
    </nav>
  );
}

export default Nav;