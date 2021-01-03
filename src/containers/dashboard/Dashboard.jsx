import React from "react";

// Libraries
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import Projects from "./pages/projects/Projects";
import Modal from "components/modal/Modal";
import LoginRegister from "components/loginregister/LoginRegister";

// Design
import "./dashboard.scss";

const Dashboard = () => {
  const state = useSelector(state => state);

  return (
    <div className="wrapper">
      {/* MODALS */}
      {state.loginRegisterModal.isOpen && (
        <Modal>
          <LoginRegister />
        </Modal>
      )}
      {/* END OF MODALS */}

      <TopBar />
      <div className="main">
        <div className={state.isSideBarOpen ? "sidebar-open" : "sidebar-close"}>
          <SideBar />
        </div>
        <div className="content">
          {state.page === "projects" && <Projects />}
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Dashboard;
