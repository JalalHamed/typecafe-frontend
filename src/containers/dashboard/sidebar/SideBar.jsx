import React, { useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import SideBarItem from "components/sidebar/Item";

// Image
import profilePicture from "assets/images/profile-picture.png";

// Designs
import "./sidebar.scss";
import TouchRipple from "components/ripple/TouchRipple";

const SideBar = () => {
  const ProfileRippleRef = useRef();
  const ProjectsRippleRef = useRef();
  const TarrifsRippleRef = useRef();
  const FinancialRippleRef = useRef();
  const SettingsRippleRef = useRef();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const isSideBarOpen = useSelector(state => state.isSideBarOpen);

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
        <div
          className={`sidebar-login ${
            isSideBarOpen ? "sidebar-login-wide" : "sidebar-login-short"
          } no-select`}
          onMouseDown={e => {
            ProfileRippleRef.current.start(e);
          }}
          onMouseUp={() => {
            ProfileRippleRef.current.stop();
          }}
          onMouseOut={() => {
            ProfileRippleRef.current.stop();
          }}
        >
          <i
            className={`icon ${
              isSideBarOpen ? "icon-user-red-big" : "icon-user-red-regular"
            } icon-less-margin`}
          />
          <div
            className={
              isSideBarOpen ? "sidebar-login-text" : "sidebar-login-no-text"
            }
          >
            <p className="sidebar-login-title">وارد شوید</p>
            <p className="sidebar-login-description">
              برای دسترسی به همه امکانات سایت، به حساب کاربری خود وارد شوید.
            </p>
          </div>
          <TouchRipple ref={ProfileRippleRef} />
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
