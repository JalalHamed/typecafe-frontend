import React, { useRef, useEffect } from "react";

// Designs
import "./sidebar.scss";
import "components/ripple/ripple.scss";

// Components
import TouchRipple from "components/ripple/TouchRipple";

const SideBar = ({ setPage, page }) => {
  const ProjectsRippleRef = useRef();
  const FinancialRippleRef = useRef();
  const SettingsRippleRef = useRef();

  return (
    <div className="sidebar-wrapper">
      <div className="user-profile">
        <div className="user-profile_photo">
          <div className="profile-picture"></div>
        </div>
        <div className="user-profile_info">recpor</div>
      </div>
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
          پروژه ها
          <TouchRipple ref={ProjectsRippleRef} />
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
          تنظیمات
          <TouchRipple ref={SettingsRippleRef} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
