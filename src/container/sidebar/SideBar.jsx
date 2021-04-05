import React, { useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import SideBarItem from "components/sidebar/Item";
import SideBarLogin from "components/sidebar/Login";
import SideBarProfile from "components/sidebar/Profile";

// Designs
import "./sidebar.scss";

const SideBar = () => {
  const loginRippleRef = useRef();
  const profileRippleRef = useRef();
  const projectsRippleRef = useRef();
  const financialRippleRef = useRef();
  const rulesRippleRef = useRef();
  const tutorialRippleRef = useRef();
  const myProjectsRippleRef = useRef();
  const supportRippleRef = useRef();
  const donateRippleRef = useRef();
  const faqRippleRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);

  return (
    <div className="sidebar-wrapper">
      {isLoggedIn ? (
        <SideBarProfile ref={profileRippleRef} />
      ) : (
        <SideBarLogin ref={loginRippleRef} />
      )}
      <div className="sidebar-items">
        <SideBarItem
          status="projects"
          title="پروژه ها"
          ref={projectsRippleRef}
        />
        {isLoggedIn && (
          <SideBarItem
            status="my-projects"
            title="پروژه های من"
            ref={myProjectsRippleRef}
          />
        )}
        {isLoggedIn && (
          <SideBarItem
            status="financial"
            title="مدیریت مالی"
            ref={financialRippleRef}
          />
        )}
        <SideBarItem status="rules" title="قوانین" ref={rulesRippleRef} />
        <SideBarItem status="tutorial" title="آموزش" ref={tutorialRippleRef} />
        <SideBarItem status="faq" title="سؤالات متداول" ref={faqRippleRef} />
        {isLoggedIn && (
          <SideBarItem
            status="support"
            title="پشتیبانی"
            ref={supportRippleRef}
          />
        )}
        {isLoggedIn && (
          <SideBarItem status="donate" title="حمایت" ref={donateRippleRef} />
        )}
      </div>
    </div>
  );
};

export default SideBar;
