import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import Projects from "./pages/projects/Projects";
import Modal from "components/modal/Modal";
import LoginRegister from "components/loginregister/LoginRegister";

// Design
import "./dashboard.scss";

const Dashboard = () => {
  const page = useSelector(state => state.page);
  const isSideBarOpen = useSelector(state => state.isSideBarOpen);
  const loginRegisterModal = useSelector(state => state.loginRegisterModal);

  return (
    <div className="wrapper">
      {/* MODALS */}
      {loginRegisterModal && (
        <Modal>
          <LoginRegister />
        </Modal>
      )}
      {/* END OF MODALS */}
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
