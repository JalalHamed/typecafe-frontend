import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import LeftSide from "./LeftSide";
import RightSide from "./rightside/RightSide";

// Actions
import { LR } from "redux/actions";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const dispath = useDispatch();

  const handleClose = () => {
    dispath(LR({ isModalOpen: false }));
  };

  return (
    <div className="lr-wrapper">
      <div className="lr-close-modal no-select" onClick={handleClose}>
        x
      </div>
      <div className="lr-right">
        <RightSide />
      </div>
      <div className="lr-left">
        <i className="icon icon-typecafe-big no-select" />
        <LeftSide />
      </div>
    </div>
  );
};

export default LoginRegister;
