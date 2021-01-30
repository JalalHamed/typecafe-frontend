import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Actions
import { Sidebar, LR, CreateProject } from "redux/actions";

// Designs
import "./topbar.scss";

const TopBar = () => {
  const dispatch = useDispatch();
  const menuIconRippleRef = useRef();
  const signUpRippleRef = useRef();
  const createProjectRippleRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);

  return (
    <div className="topbar-wrapper no-select">
      <div className="topbar-right">
        <div
          className="hamburger-menu-icon no-select"
          onClick={() => dispatch(Sidebar({ isSidebarOpen: !isSidebarOpen }))}
          onMouseDown={e => {
            menuIconRippleRef.current.start(e);
          }}
          onMouseUp={() => {
            menuIconRippleRef.current.stop();
          }}
          onMouseOut={() => {
            menuIconRippleRef.current.stop();
          }}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
          <TouchRipple ref={menuIconRippleRef} />
        </div>
        <i className="icon icon-typecafe icon-no-margin no-select" />
        <p className="site-title no-select">تایپ‌کافه</p>
      </div>
      <div className="topbar-left">
        {!isLoggedIn && (
          <div
            className="topbar-sign-up"
            onClick={() => dispatch(LR({ isModalOpen: true }))}
            onMouseDown={e => {
              signUpRippleRef.current.start(e);
            }}
            onMouseUp={() => {
              signUpRippleRef.current.stop();
            }}
            onMouseOut={() => {
              signUpRippleRef.current.stop();
            }}
          >
            <i className="icon icon-user-red-regular" />
            <span style={{ color: "#ff2d2d" }}>ورود/ثبت‌نام</span>
            <TouchRipple ref={signUpRippleRef} />
          </div>
        )}
        {isLoggedIn && (
          <div
            className="create-project"
            onClick={() => dispatch(CreateProject({ isModalOpen: true }))}
            onMouseDown={e => {
              createProjectRippleRef.current.start(e);
            }}
            onMouseUp={() => {
              createProjectRippleRef.current.stop();
            }}
            onMouseOut={() => {
              createProjectRippleRef.current.stop();
            }}
          >
            <i className="icon icon-create" />
            <p className="create-project-title">ثبت پروژه</p>
            <TouchRipple ref={createProjectRippleRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
