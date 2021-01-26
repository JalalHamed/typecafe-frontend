import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Actions
import { Sidebar, LR } from "redux/actions";

// Designs
import "./topbar.scss";

const TopBar = () => {
  const dispatch = useDispatch();
  const MenuIconRippleRef = useRef();
  const SignUpRippleRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);

  return (
    <div className="topbar-wrapper no-select">
      <div className="topbar-right">
        <div
          className="hamburger-menu-icon no-select"
          onClick={() => dispatch(Sidebar({ isSidebarOpen: !isSidebarOpen }))}
          onMouseDown={e => {
            MenuIconRippleRef.current.start(e);
          }}
          onMouseUp={() => {
            MenuIconRippleRef.current.stop();
          }}
          onMouseOut={() => {
            MenuIconRippleRef.current.stop();
          }}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
          <TouchRipple ref={MenuIconRippleRef} />
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
              SignUpRippleRef.current.start(e);
            }}
            onMouseUp={() => {
              SignUpRippleRef.current.stop();
            }}
            onMouseOut={() => {
              SignUpRippleRef.current.stop();
            }}
          >
            <i className="icon icon-user-red-regular" />
            <span style={{ color: "#ff2d2d" }}>ورود/ثبت‌نام</span>
            <TouchRipple ref={SignUpRippleRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
