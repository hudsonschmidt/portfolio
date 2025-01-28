import React from 'react';
import EdAbout from './ed_about';
import EdPCHS from './ed_pchs';
import EdCalPoly from './ed_calpoly';
import './education.css';


function Education() {
  return (
    <div id = "edbody" className="container-fluid">
      <EdAbout />
      <EdCalPoly />
      <EdPCHS />
    </div>
  );
}

export default Education;