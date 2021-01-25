import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import LeftSide from "./LeftSide";
import RightSide from "./rightside/RightSide";

// Actions
import { closeLRModal, LRModal } from "redux/actions";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const dispath = useDispatch();

  const handleClose = () => {
    dispath(LRModal({ page: "Email" }));
    dispath(closeLRModal());
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
