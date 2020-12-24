import React from "react";

// Componenets
import Topbar from "components/topbar/Topbar";
import LoginRegister from "./loginregister/LoginRegister";
import GoToWhatIsIt from "./loginregister/GoToWhatIsIt";

// Design
import "./homepage.scss";

const HomePage = () => {
  return (
    <div className="home-page-wrapper">
      <Topbar />
      <div className="loginregister-section-wrapper">
        <LoginRegister />
      </div>
      <div className="gotowhatisit-section-wrapper">
        <GoToWhatIsIt />
      </div>
    </div>
  );
};

export default HomePage;
