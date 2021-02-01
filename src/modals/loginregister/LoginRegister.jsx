import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import RightSide from "./RightSide";
import LeftSide from "./leftside/LeftSide";

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
      <div className="close-modal no-select" onClick={handleClose}>
        x
      </div>
      <div className="lr-right">
        <i className="icon icon-typecafe-big no-select" />
        <RightSide />
      </div>
      <div className="lr-left">
        <LeftSide />
      </div>
    </div>
  );
};

export default LoginRegister;
