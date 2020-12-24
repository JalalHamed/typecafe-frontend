import React from "react";

// Componenets
import Topbar from "components/topbar/Topbar";
import LoginRegister from "components/login&register/LoginRegister";

// Design
import "./homepage.scss";

const HomePage = () => {
  return (
    <div>
      <Topbar />
      <div className="home-page-wrapper">
        <LoginRegister />
      </div>
    </div>
  );
};

export default HomePage;
