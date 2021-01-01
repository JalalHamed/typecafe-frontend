import React, { useRef, useState } from "react";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Image
import profilePicture from "assets/images/profile-picture.png";

// Designs
import "./sidebar.scss";
import "components/ripple/ripple.scss";

const SideBar = ({ setPage, page }) => {
  const [isLogin, setIsLogin] = useState(false);

  const ProjectsRippleRef = useRef();
  const TarrifsRippleRef = useRef();
  const FinancialRippleRef = useRef();
  const SettingsRippleRef = useRef();

  return (
    <div className="sidebar-wrapper">
      {isLogin ? (
        <div className="user-profile">
          <div className="user-profile_photo">
            <img src={profilePicture} alt="Guest" className="profile-picture" />
          </div>
          <div className="user-profile_info">وارد شوید</div>
        </div>
      ) : (
        <div className="sidebar-login">
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
        <div
          className={`sidebar-items_item${
            page === "projects" ? "_selected" : ""
          }`}
          onClick={() => setPage("projects")}
          onMouseDown={e => {
            ProjectsRippleRef.current.start(e);
          }}
          onMouseUp={() => {
            ProjectsRippleRef.current.stop();
          }}
        >
          <i
            className={`icon ${
              page === "projects"
                ? "icon-projects-black"
                : "icon-projects-white"
            }`}
          />
          پروژه ها
          <TouchRipple ref={ProjectsRippleRef} />
        </div>
        <div
          className={`sidebar-items_item${
            page === "tarrifs" ? "_selected" : ""
          }`}
          onClick={() => setPage("tarrifs")}
          onMouseDown={e => {
            TarrifsRippleRef.current.start(e);
          }}
          onMouseUp={() => {
            TarrifsRippleRef.current.stop();
          }}
        >
          <i
            className={`icon ${
              page === "tarrifs" ? "icon-abacus-black" : "icon-abacus-white"
            }`}
          />
          تعرفه ها
          <TouchRipple ref={TarrifsRippleRef} />
        </div>
        <div
          className={`sidebar-items_item${
            page === "financial" ? "_selected" : ""
          }`}
          onClick={() => setPage("financial")}
          onMouseDown={e => {
            FinancialRippleRef.current.start(e);
          }}
          onMouseUp={() => {
            FinancialRippleRef.current.stop();
          }}
        >
          <i
            className={`icon ${
              page === "financial" ? "icon-wallet-black" : "icon-wallet-white"
            }`}
          />
          کیف پول
          <TouchRipple ref={FinancialRippleRef} />
        </div>
        <div
          className={`sidebar-items_item${
            page === "settings" ? "_selected" : ""
          }`}
          onClick={() => setPage("settings")}
          onMouseDown={e => {
            SettingsRippleRef.current.start(e);
          }}
          onMouseUp={() => {
            SettingsRippleRef.current.stop();
          }}
        >
          <i
            className={`icon ${
              page === "settings" ? "icon-gear-black" : "icon-gear-white"
            }`}
          />
          تنظیمات
          <TouchRipple ref={SettingsRippleRef} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
