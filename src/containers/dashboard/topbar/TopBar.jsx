import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Designs
import "./topbar.scss";

// Actions
import { toggleSideBar } from "redux/actions";

const TopBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="topbar-wrapper">
      <i className="icon icon-menu" onClick={() => dispatch(toggleSideBar())} />
      <p className="site-title no-select">تایپ کافه</p>
    </div>
  );
};

export default TopBar;
