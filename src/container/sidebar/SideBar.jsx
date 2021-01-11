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
  const LoginRippleRef = useRef();
  const ProjectsRippleRef = useRef();
  const TarrifsRippleRef = useRef();
  const FinancialRippleRef = useRef();
  const SettingsRippleRef = useRef();
  const LogoutRippleRef = useRef();
  const ProfileRippleRef = useRef();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <div className="sidebar-wrapper">
      {isLoggedIn ? (
        <SideBarProfile ref={ProfileRippleRef} />
      ) : (
        <SideBarLogin ref={LoginRippleRef} />
      )}
      <div className="sidebar-items">
        <SideBarItem
          status="projects"
          title="پروژه ها"
          ref={ProjectsRippleRef}
        />
        <SideBarItem status="tarrifs" title="تعرفه ها" ref={TarrifsRippleRef} />
        <SideBarItem
          status="financial"
          title="کیف پول"
          ref={FinancialRippleRef}
        />
        <SideBarItem
          status="settings"
          title="تنظیمات"
          ref={SettingsRippleRef}
        />
        {isLoggedIn && (
          <SideBarItem status="logout" title="خروج" ref={LogoutRippleRef} />
        )}
      </div>
    </div>
  );
};

export default SideBar;
