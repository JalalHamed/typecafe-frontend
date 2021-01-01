import React, { useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import SideBarItem from "components/sidebar/Item";

// Image
import profilePicture from "assets/images/profile-picture.png";

// Designs
import "./sidebar.scss";

const SideBar = () => {
  const ProjectsRippleRef = useRef();
  const TarrifsRippleRef = useRef();
  const FinancialRippleRef = useRef();
  const SettingsRippleRef = useRef();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <div className="sidebar-wrapper">
      {isLoggedIn ? (
        <div className="user-profile">
          <div className="user-profile_photo">
            <img src={profilePicture} alt="Guest" className="profile-picture" />
          </div>
          <div className="user-profile_info">نام کاربری</div>
        </div>
      ) : (
        <div className="sidebar-login no-select">
          <div className="sidebar-login-icon">
            <i className="icon icon-user-red icon-less-margin" />
          </div>
          <div className="sidebar-login-text">
            <p className="sidebar-login-title">وارد شوید</p>
            <p className="sidebar-login-description">
              برای دسترسی به همه امکانات سایت، به حساب کاربری خود وارد شوید.
            </p>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default SideBar;
