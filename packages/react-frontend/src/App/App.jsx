import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Nav from "./Nav"
import Home from "../Home/Home.jsx"

import "./app.css"


function App() {
  return (
    <div id = "app" className="container-fluid">
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;