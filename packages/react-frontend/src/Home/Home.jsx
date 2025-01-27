import React from 'react';
import HomeBody from "./body"
import HomeAbout from "./home_about"
import "./main.css";
import "./col.css";


function Home() {
  return (
    <div id = "body" className="container-fluid">
      <HomeBody />
      <HomeAbout />
    </div>
  );
}

export default Home;
