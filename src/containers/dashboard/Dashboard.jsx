import React, { useState } from "react";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import Projects from "./pages/projects/Projects";

// Design
import "./dashboard.scss";

const Dashboard = () => {
  const [page, setPage] = useState("projects");

  return (
    <div className="wrapper">
      <TopBar />
      <div className="main">
        <div className="sidebar">
          <SideBar page={page} setPage={setPage} />
        </div>
        <div className="content">{page === "projects" && <Projects />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
