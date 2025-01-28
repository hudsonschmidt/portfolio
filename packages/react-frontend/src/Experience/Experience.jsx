import React from 'react';
import ExpAbout from './exp_about';
import ExpGhidottis from './exp_ghidottis';
import ExpBD from './exp_bd';
import ExpWow from './exp_wow';
import './experience.css';


function Experience() {
  return (
    <div id = "expbody" className="container-fluid">
      <ExpAbout />
      <ExpWow />
      <ExpBD />
      <ExpGhidottis />
    </div>
  );
}

export default Experience;