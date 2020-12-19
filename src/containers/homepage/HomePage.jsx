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
        <div>
          <p>به تایپ کافه خوش آمدید.</p>
          <p>
            پروژه های تایپ خود را آپلود کنید و آن ها را تایپ شده تحویل بگیرید.
          </p>
          <p>برای شروع وارد شوید.</p>
        </div>
        <div>
          <LoginRegister />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
