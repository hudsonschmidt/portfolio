import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Nav from "./Nav"
import Home from "../Home/Home.jsx"
import Experience from "../Experience/Experience.jsx"
import Projects from '../Projects/Projects.jsx';
import Education from '../Education/Education.jsx';
import Resume from "../Resume/Resume.jsx"

import "./app.css"

// Error Boundary component to catch runtime errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger m-5">
          <h2>Something went wrong</h2>
          <p>Please refresh the page and try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

// 404 Not Found component
function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

function App() {
  return (
    <div id = "app" className="container-fluid">
      <Nav />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/experience" element={<Experience/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/education" element={<Education/>} />
          <Route path="/resume" element={<Resume/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;