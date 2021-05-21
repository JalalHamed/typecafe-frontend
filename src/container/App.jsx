import React, { useEffect, useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

// Pages
import Projects from "./pages/projects/Projects";
import MyProjects from "./pages/myprojects/MyProjects";
import TheMessages from "./pages/messages/Messages";
import Financials from "./pages/financials/Financials";
import Rules from "./pages/rules/Rules";
import Support from "./pages/support/Support";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import Modals from "./Modals";
import Requests from "./Requests";
import Sockets from "./Sockets";

// Actions
import { Sidebar, Tokens } from "redux/actions";

// Requests
import socket from "requests/socket";
import { UserDisconnect } from "requests";

// Design
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [width, setWidth] = useState(window.innerWidth);

  window.onbeforeunload = () => {
    if (state.Tokens.ac_t && state.Tokens.re_t) {
      sessionStorage.setItem("_at", state.Tokens.ac_t);
      sessionStorage.setItem("_rt", state.Tokens.re_t);
    }
    UserDisconnect()
      .then(res => console.log(res))
      .catch(err => console.log(err));
    socket.send(
      JSON.stringify({
        status: "user-offline",
        user_id: state.User.id,
      })
    );
  };

  useEffect(() => {
    if (sessionStorage.getItem("_at") && sessionStorage.getItem("_rt"))
      dispatch(
        Tokens({
          re_t: sessionStorage.getItem("_rt"),
          ac_t: sessionStorage.getItem("_at"),
        })
      );

    // eslint-disable-next-line
  }, [sessionStorage.getItem("_at"), sessionStorage.getItem("_rt")]);

  useEffect(() => {
    if (state.Tokens.re_t && state.Tokens.ac_t) sessionStorage.clear();
  }, [state.Tokens.re_t, state.Tokens.ac_t]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    if (width < 1350 && state.Sidebar.isOpen === true) {
      dispatch(Sidebar({ isOpen: false }));
    }
    if (width >= 1350 && state.Sidebar.isOpen === false) {
      dispatch(Sidebar({ isOpen: true }));
    }
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };

    // eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    console.log(socket);
  }, []);

  useEffect(() => {
    if (state.User.id && socket) {
      socket.send(
        JSON.stringify({
          status: "user-online",
          user_id: state.User.id,
        })
      );
    }
  }, [state.User.id]);

  return (
    <div className="wrapper">
      <Requests />
      <Sockets />
      <Modals />
      <TopBar />
      <div className="main">
        <div
          className={state.Sidebar.isOpen ? "sidebar-open" : "sidebar-close"}
        >
          <SideBar />
        </div>
        <div className="content">
          {state.Sidebar.page === "projects" && <Projects />}
          {state.Sidebar.page === "my-projects" && <MyProjects />}
          {state.Sidebar.page === "messages" && <TheMessages />}
          {state.Sidebar.page === "financials" && <Financials />}
          {state.Sidebar.page === "rules" && <Rules />}
          {state.Sidebar.page === "support" && <Support />}
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl
        pauseOnHover
      />
    </div>
  );
};

export default App;
