import React, { useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import SideBarItem from "components/sidebar/Item";
import SideBarLogin from "components/sidebar/Login";
import SideBarProfile from "components/sidebar/Profile";

// Designs
import "./sidebar.scss";

const SideBar = () => {
  const loginRippleRef = useRef();
  const profileRippleRef = useRef();
  const projectsRippleRef = useRef();
  const messagesRippleRef = useRef();
  const financialRippleRef = useRef();
  const rulesRippleRef = useRef();
  const tutorialRippleRef = useRef();
  const myProjectsRippleRef = useRef();
  const supportRippleRef = useRef();
  // const donateRippleRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);
  const isLoading = useSelector(state => state.Sidebar.isLoading);

  return (
    <div className="sidebar-wrapper">
      {!isLoading ? (
        <>
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
                title="کارهای من"
                ref={myProjectsRippleRef}
              />
            )}
            {isLoggedIn && (
              <SideBarItem
                status="messages"
                title="پیام ها"
                ref={messagesRippleRef}
              />
            )}
            {isLoggedIn && (
              <SideBarItem
                status="financials"
                title="مدیریت مالی"
                ref={financialRippleRef}
              />
            )}
            <SideBarItem status="rules" title="قوانین" ref={rulesRippleRef} />
            <SideBarItem
              status="tutorial"
              title="آموزش"
              ref={tutorialRippleRef}
            />
            {isLoggedIn && (
              <SideBarItem
                status="support"
                title="پشتیبانی"
                ref={supportRippleRef}
              />
            )}
            {/* {isLoggedIn && (
              <SideBarItem
                status="donate"
                title="حمایت"
                ref={donateRippleRef}
              />
            )} */}
          </div>
        </>
      ) : (
        <div className="sidebar-loading">
          <Puffloader color="#fff" loading={isLoading} size={100} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
