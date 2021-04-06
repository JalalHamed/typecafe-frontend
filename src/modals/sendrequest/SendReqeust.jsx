import React from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Components
import Close from "components/buttons/Close";
import { PriceFormat, toFarsiNumber } from "components/helper";

// Actions
import { Project } from "redux/actions";

// Design
import "./sendrequest.scss";

const SendRequest = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="sendrequest-wrapper"
    >
      <Close
        className="close-modal"
        onClick={() => dispatch(Project({ isModalOpen: false }))}
      />
      <p>{PriceFormat(state.User.credit)}</p>
      <p>page count {toFarsiNumber(Number(state.Project.selectedPageCount))}</p>
      <p>
        price per page {PriceFormat(Number(state.Project.selectedPricePerPage))}
      </p>
    </motion.div>
  );
};

export default SendRequest;
