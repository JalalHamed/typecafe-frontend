import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// hooks
import UseOnClickOutside from "hooks/UseOnClickOutside";

// Components
import { Puffloader } from "components/loader/";
import RippleWrapper from "components/ripple/RippleWrapper";
import UserDropDown from "components/dropdowns/UserDropDown";

// Actions
import { Sidebar, LR, CreateProject, User } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./topbar.scss";

const TopBar = () => {
  const dispatch = useDispatch();
  const menuIconRef = useRef();
  const signUpRef = useRef();
  const createProjectRef = useRef();
  const userDropDownRef = useRef();
  const user = useSelector(state => state.User);
  const userDropDown = useSelector(state => state.User.isDropdownOpen);
  const isSidebarOpen = useSelector(state => state.Sidebar.isOpen);

  UseOnClickOutside(userDropDownRef, () => {
    if (userDropDown) dispatch(User({ isDropdownOpen: false }));
  });

  return (
    <div className="topbar-wrapper">
      <div className="topbar-right">
        <RippleWrapper
          className="hamburger-menu-icon no-select"
          onClick={() => dispatch(Sidebar({ isOpen: !isSidebarOpen }))}
          ref={menuIconRef}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </RippleWrapper>
        <i className="icon icon-typecafe icon-no-margin no-select" />
        <p className="site-title no-select">تایپ‌کافه</p>
      </div>
      <div className="topbar-left">
        {!user.isTopbarLoading ? (
          <>
            {!user.isLoggedIn ? (
              <RippleWrapper
                className="topbar-sign-up no-select"
                onClick={() => dispatch(LR({ isModalOpen: true }))}
                ref={signUpRef}
              >
                <i className="icon icon-user-red-topbar" />
                <span style={{ color: "#ff2d2d" }}>ورود/ثبت‌نام</span>
              </RippleWrapper>
            ) : (
              <div className="topbar-left-user-logged-in">
                <RippleWrapper
                  className="create-project no-select"
                  onClick={() => dispatch(CreateProject({ isModalOpen: true }))}
                  ref={createProjectRef}
                >
                  <i className="icon icon-create" />
                  <p className="create-project-title">ثبت پروژه</p>
                </RippleWrapper>
                <div
                  className={`speaker ${user.playSounds ? "" : "mute"}`}
                  onClick={() =>
                    dispatch(User({ playSounds: !user.playSounds }))
                  }
                >
                  <span />
                </div>
                <div ref={userDropDownRef}>
                  {user.isDropdownOpen && <UserDropDown />}
                  <div
                    className="user-wrapper no-select"
                    onClick={() =>
                      dispatch(User({ isDropdownOpen: !userDropDown }))
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
              </div>
            )}
          </>
        ) : (
          <Puffloader color="#fff" loading={user.isTopbarLoading} size={40} />
        )}
      </div>
    </div>
  );
};

export default TopBar;
