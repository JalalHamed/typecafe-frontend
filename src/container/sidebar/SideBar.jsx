import { useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import SideBarItem from "components/sidebar/Item";
import SideBarLogin from "components/sidebar/Login";
import SideBarProfile from "components/sidebar/Profile";

// Designs
import "./sidebar.scss";

const SideBar = () => {
  const loginRef = useRef();
  const profileRef = useRef();
  const projectsRef = useRef();
  const messagesRef = useRef();
  const financialRef = useRef();
  const rulesRef = useRef();
  const tutorialRef = useRef();
  const myProjectsAndOffersRef = useRef();
  const supportRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);
  const isLoading = useSelector(state => state.Sidebar.isLoading);

  return (
    <div className="sidebar-wrapper">
      {!isLoading ? (
        <>
          {isLoggedIn ? (
            <SideBarProfile ref={profileRef} />
          ) : (
            <SideBarLogin ref={loginRef} />
          )}
          <div className="sidebar-items">
            <SideBarItem status="projects" title="پروژه ها" ref={projectsRef} />
            {isLoggedIn && (
              <SideBarItem
                status="myprojectsandoffers"
                title="کارهای من"
                ref={myProjectsAndOffersRef}
              />
            )}
            {isLoggedIn && (
              <SideBarItem
                status="messages"
                title="پیام ها"
                ref={messagesRef}
              />
            )}
            {isLoggedIn && (
              <SideBarItem
                status="financials"
                title="مدیریت مالی"
                ref={financialRef}
              />
            )}
            <SideBarItem status="rules" title="قوانین" ref={rulesRef} />
            <SideBarItem status="tutorial" title="آموزش" ref={tutorialRef} />
            {isLoggedIn && (
              <SideBarItem status="support" title="پشتیبانی" ref={supportRef} />
            )}
          </div>
        </>
      ) : (
        <div className="middle-of-the-page">
          <Puffloader color="#fff" loading={isLoading} size={100} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
