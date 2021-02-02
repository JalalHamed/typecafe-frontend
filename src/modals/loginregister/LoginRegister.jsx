import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import RightSide from "./RightSide";
import LeftSide from "./leftside/LeftSide";
import Close from "components/buttons/Close";

// Actions
import { LR } from "redux/actions";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const dispath = useDispatch();

  return (
    <div className="lr-wrapper">
      <Close onClick={() => dispath(LR({ isModalOpen: false }))} />
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
