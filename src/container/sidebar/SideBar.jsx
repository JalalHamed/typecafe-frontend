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
  const AddNewRippleRef = useRef();
  const TarrifsRippleRef = useRef();
  const FinancialRippleRef = useRef();
  const SettingsRippleRef = useRef();
  const RulesRippleRef = useRef();
  const LogoutRippleRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);

  return (
    <div className="sidebar-wrapper">
      {isLoggedIn ? <SideBarProfile /> : <SideBarLogin ref={LoginRippleRef} />}
      <div className="sidebar-items">
        <SideBarItem
          status="projects"
          title="پروژه ها"
          ref={ProjectsRippleRef}
        />
        {isLoggedIn && (
          <SideBarItem
            status="addnew"
            title="ثبت پروژه"
            ref={AddNewRippleRef}
          />
        )}
        <SideBarItem
          status="financial"
          title="کیف پول"
          ref={FinancialRippleRef}
        />
        <SideBarItem status="tarrifs" title="تعرفه ها" ref={TarrifsRippleRef} />
        <SideBarItem status="rules" title="قوانین" ref={RulesRippleRef} />
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
