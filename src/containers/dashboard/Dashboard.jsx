import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import Projects from "./pages/projects/Projects";

// Design
import "./dashboard.scss";

const Dashboard = () => {
  const page = useSelector(state => state.page);
  const isSideBarOpen = useSelector(state => state.isSideBarOpen);

  return (
    <div className="wrapper">
      <TopBar />
      <div className="main">
        <div className={isSideBarOpen ? "sidebar-open" : "sidebar-close"}>
          <SideBar />
        </div>
        <div className="content">{page === "projects" && <Projects />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
