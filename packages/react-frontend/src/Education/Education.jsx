import React from 'react';
import EdAbout from './ed_about';
import EdCalPoly from './ed_calpoly';
import './education.css';


function Education() {
  return (
    <div id = "edbody" className="container-fluid">
      <EdAbout />
      <EdCalPoly />
    </div>
  );
}

export default Education;