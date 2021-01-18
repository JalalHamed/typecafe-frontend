import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

// Actions
import { closeLrModal } from "redux/actions";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const dispath = useDispatch();

  return (
    <div className="lr-wrapper">
      <div
        className="lr-close-modal no-select"
        onClick={() => dispath(closeLrModal())}
      >
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
