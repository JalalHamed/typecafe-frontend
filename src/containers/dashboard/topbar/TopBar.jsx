import React, { useRef } from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Actions
import { toggleSideBar } from "redux/actions";

// Designs
import "./topbar.scss";

const TopBar = () => {
  const dispatch = useDispatch();

  const MenuIconRippleRef = useRef();

  return (
    <div className="topbar-wrapper">
      <div
        className="hamburger-menu-icon no-select"
        onClick={() => dispatch(toggleSideBar())}
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
  );
};

export default TopBar;
