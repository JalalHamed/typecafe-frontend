import React, { useEffect, useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

// Pages
import Projects from "./pages/projects/Projects";
import MyProjects from "./pages/myprojects/MyProjects";
import Messages from "./pages/messages/Messages";
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
import { User, Offers, ProjectsAction, Sidebar, Loading } from "redux/actions";

// Requests
import Socket from "requests/Socket";
import { UserData, GetProjects, GetMyProjects, GetOffers } from "requests";

// Design
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [width, setWidth] = useState(window.innerWidth);

  const getInitials = () => {
    // Get Projects
    dispatch(ProjectsAction({ loading: true }));
    GetProjects()
      .then(res => {
        dispatch(ProjectsAction({ loading: false }));
        dispatch(ProjectsAction({ projects: res.results }));
        if (res.next) {
          dispatch(ProjectsAction({ next: res.next }));
        } else {
          dispatch(ProjectsAction({ next: "" }));
        }
      })
      .catch(err => {
        dispatch(ProjectsAction({ loading: false }));
        console.log(err);
      });

    // Check if user is logged in
    if (sessionStorage.getItem("ac_t")) {
      // Get User Data
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
            sessionStorage.removeItem("ac_t");
          }
        });

      // Get My Projects
      dispatch(ProjectsAction({ myprojectsloading: true }));
      GetMyProjects()
        .then(res => {
          dispatch(ProjectsAction({ myprojectsloading: false }));
          dispatch(ProjectsAction({ myprojects: res }));
        })
        .catch(err => {
          dispatch(ProjectsAction({ myprojectsloading: false }));
          console.log(err);
        });

      // Get Offers
      GetOffers().then(res => {
        dispatch(Offers({ offers: res }));
      });
    }
  };

  useEffect(() => {
    getInitials();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (width < 1350) {
      dispatch(Sidebar({ isSidebarOpen: false }));
    } else {
      dispatch(Sidebar({ isSidebarOpen: true }));
    }

    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };

    // eslint-disable-next-line
  }, [width]);

  if (sessionStorage.getItem("ac_t") && Socket) {
    Socket.onopen = () => {
      dispatch(Loading({ isLoading: false }));
    };

    Socket.onclose = () => {
      dispatch(Loading({ isLoading: true }));
    };

    Socket.onmessage = e => {
      console.log("new message");
      let data = JSON.parse(e.data);
      switch (data.ws_type) {
        case "new-project":
          dispatch(
            ProjectsAction({ projects: [data, ...state.Projects.projects] })
          );
          if (data.client_email === state.User.email) {
            dispatch(
              ProjectsAction({
                myprojects: [data, ...state.Projects.myprojects],
              })
            );
          }
          break;
        case "delete-project":
          dispatch(
            ProjectsAction({
              projects: state.Projects.projects.filter(x => x.id !== data.id),
            })
          );
          dispatch(
            ProjectsAction({
              myprojects: state.Projects.myprojects.filter(
                x => x.id !== data.id
              ),
            })
          );
          break;
        case "new-offer":
          dispatch(Offers({ offers: [data, ...state.Offers.offers] }));
          break;
        default:
          break;
      }
    };
  }

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
          {state.Sidebar.page === "messages" && <Messages />}
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
