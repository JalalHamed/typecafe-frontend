import React from "react";

// Libraries
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Pages
import Projects from "./pages/projects/Projects";
import Rules from "./pages/rules/Rules";

// Components
import MinimizedCreateProject from "components/minimizes/MinimizedCreateProject";
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import UserDropDown from "components/dropdowns/UserDropDown";

// Modals & Clicks
import Modals from "./Modals";

// Design
import "./app.scss";

const App = () => {
  const state = useSelector(state => state);

  return (
    <div className="wrapper">
      <Modals />

      <TopBar />
      <div className="main">
        <div
          className={
            state.Sidebar.isSidebarOpen ? "sidebar-open" : "sidebar-close"
          }
        >
          <SideBar />
        </div>
        <div className="content">
          {state.User.isDropdownOpen && <UserDropDown />}

          {state.Sidebar.page === "projects" && <Projects />}
          {state.Sidebar.page === "rules" && <Rules />}

          {!!state.CreateProject.files.length &&
            !state.CreateProject.isModalOpen && <MinimizedCreateProject />}
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl
        pauseOnHover
      />
    </div>
  );
};

export default App;
