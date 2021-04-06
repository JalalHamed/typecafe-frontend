import React from "react";

// Libraries
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

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
    <motion.div
      className="lr-wrapper"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
    >
      <Close onClick={() => dispath(LR({ isModalOpen: false }))} />
      <div className="lr-right">
        <i className="icon icon-typecafe-big no-select" />
        <RightSide />
      </div>
      <div className="lr-left">
        <LeftSide />
      </div>
    </motion.div>
  );
};

export default LoginRegister;
