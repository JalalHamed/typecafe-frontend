import React from "react";

// Designs
import "./sidebar.scss";

const SideBar = ({ setPage, page }) => {
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
        >
          پروژه ها
        </div>
        <div
          className={`sidebar-items_item${
            page === "financial" ? "_selected" : ""
          }`}
          onClick={() => setPage("financial")}
        >
          کیف پول
        </div>
        <div
          className={`sidebar-items_item${
            page === "settings" ? "_selected" : ""
          }`}
          onClick={() => setPage("settings")}
        >
          تنظیمات
        </div>
      </div>
    </div>
  );
};

export default SideBar;
