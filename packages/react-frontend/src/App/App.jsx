import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tracker from '../components/Tracker.jsx';

import Nav from "./Nav"
import Home from "../Home/Home.jsx"
import Experience from "../Experience/Experience.jsx"
import Projects from '../Projects/Projects.jsx';
import Education from '../Education/Education.jsx';
import Resume from "../Resume/Resume.jsx"

import "./app.css"


function App() {
  return (
    <div id = "app" className="container-fluid">
      <Tracker />
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/experience" element={<Experience/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/education" element={<Education/>} />
        <Route path="/resume" element={<Resume/>} />
      </Routes>
    </div>
  );
}

export default App;