import React, { useEffect } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

// Pages
import Projects from "./pages/projects/Projects";
import MyProjects from "./pages/myprojects/MyProjects";
import Financials from "./pages/financials/Financials";
import Rules from "./pages/rules/Rules";
import Support from "./pages/support/Support";
import Donate from "./pages/donate/Donate";
import Faq from "./pages/faq/Faq";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";

// Modals & Clicks
import Modals from "./Modals";

// Actions
import { User, Offers } from "redux/actions";

// Requests
import Socket from "requests/Socket";
import { UserData, GetOffers } from "requests";

// Design
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    // Check if user is logged in
    if (localStorage.getItem("ac_t")) {
      UserData()
        .then(res => {
          dispatch(
            User({
              isLoggedIn: true,
              displayname: res.displayname,
              email: res.email,
              credit: res.credit,
              image: res.image,
            })
          );
        })
        .catch(err => {
          if (err.response?.data?.detail === "User not found") {
            localStorage.removeItem("ac_t");
          }
        });
    }

    // Get Offers
    GetOffers().then(res => {
      dispatch(Offers({ offers: res }));
    });

    // eslint-disable-next-line
  }, []);

  Socket.onopen = () => {
    console.log("socket open");
  };

  Socket.onclose = () => {
    console.log("socket close");
  };

  Socket.onmessage = e => {
    console.log("haji");
    let data = JSON.parse(e.data);
    if (data.ws_type === "new-offer") {
      console.log("in");
      dispatch(Offers({ offers: data }));
    }
  };

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
          {state.Sidebar.page === "projects" && <Projects />}
          {state.Sidebar.page === "my-projects" && <MyProjects />}
          {state.Sidebar.page === "financials" && <Financials />}
          {state.Sidebar.page === "rules" && <Rules />}
          {state.Sidebar.page === "support" && <Support />}
          {state.Sidebar.page === "donate" && <Donate />}
          {state.Sidebar.page === "faq" && <Faq />}
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
