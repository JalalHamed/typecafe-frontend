import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// hooks
import UseOnClickOutside from "hooks/UseOnClickOutside";

// Components
import RippleWrapper from "components/ripple/RippleWrapper";

// Actions
import { Sidebar, LR, CreateProject, User } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./topbar.scss";

const TopBar = () => {
  const dispatch = useDispatch();
  const menuIconRippleRef = useRef();
  const signUpRippleRef = useRef();
  const createProjectRippleRef = useRef();
  const notifRippleRef = useRef();
  const userRippleRef = useRef();
  const user = useSelector(state => state.User);
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);
  const isDropdownOpen = useSelector(state => state.User.isDropdownOpen);

  UseOnClickOutside(userRippleRef, () =>
    dispatch(User({ isDropdownOpen: false }))
  );

  return (
    <div className="topbar-wrapper no-select">
      <div className="topbar-right">
        <RippleWrapper
          className="hamburger-menu-icon no-select"
          onClick={() => dispatch(Sidebar({ isSidebarOpen: !isSidebarOpen }))}
          ref={menuIconRippleRef}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </RippleWrapper>
        <i className="icon icon-typecafe icon-no-margin no-select" />
        <p className="site-title no-select">تایپ‌کافه</p>
      </div>
      <div className="topbar-left">
        {!user.isLoggedIn ? (
          <RippleWrapper
            className="topbar-sign-up"
            onClick={() => dispatch(LR({ isModalOpen: true }))}
            ref={signUpRippleRef}
          >
            <i className="icon icon-user-red-topbar" />
            <span style={{ color: "#ff2d2d" }}>ورود/ثبت‌نام</span>
          </RippleWrapper>
        ) : (
          <div className="topbar-left-user-logged-in">
            <RippleWrapper
              className="create-project"
              onClick={() => dispatch(CreateProject({ isModalOpen: true }))}
              ref={createProjectRippleRef}
            >
              <i className="icon icon-create" />
              <p className="create-project-title">ثبت پروژه</p>
            </RippleWrapper>
            <div className="notif-wrapper" ref={notifRippleRef}>
              <i className="icon icon-notification" />
            </div>
            <div
              ref={userRippleRef}
              className="user-wrapper"
              onClick={() =>
                dispatch(User({ isDropdownOpen: !isDropdownOpen }))
              }
            >
              {!user.image ? (
                <i className="icon icon-user-default-regular" />
              ) : (
                <img
                  src={baseURL + user.image}
                  alt="User Profile"
                  className="user-profile"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
