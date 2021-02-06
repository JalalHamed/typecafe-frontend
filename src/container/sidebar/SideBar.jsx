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
  const tarrifsRippleRef = useRef();
  const financialRippleRef = useRef();
  const settingsRippleRef = useRef();
  const rulesRippleRef = useRef();
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
        <SideBarItem
          status="financial"
          title="کیف پول"
          ref={financialRippleRef}
        />
        <SideBarItem status="tarrifs" title="تعرفه ها" ref={tarrifsRippleRef} />
        <SideBarItem status="rules" title="قوانین" ref={rulesRippleRef} />
        <SideBarItem
          status="settings"
          title="تنظیمات"
          ref={settingsRippleRef}
        />
      </div>
    </div>
  );
};

export default SideBar;
