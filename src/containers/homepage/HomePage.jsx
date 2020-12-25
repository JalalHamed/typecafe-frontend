import React from "react";

// Componenets
import Topbar from "components/topbar/Topbar";
import LoginRegister from "./loginregister/LoginRegister";
import SiteDescription from "./sitedescription/SiteDescription";
import ScrollDown from "./scrolldown/ScrollDown";

// Design
import "./homepage.scss";

const HomePage = () => {
  return (
    <div className="home-page-wrapper">
      {/* <Topbar /> */}
      <div className="banner-section-wrapper">
        <SiteDescription />
        <LoginRegister />
      </div>
      <div className="scrolldown-section-wrapper">
        <ScrollDown />
      </div>
    </div>
  );
};

export default HomePage;
