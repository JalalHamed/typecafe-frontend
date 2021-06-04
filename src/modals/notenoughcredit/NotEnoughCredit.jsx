import React, { useRef } from "react";

// Libraris
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";

// Actions
import { NotEnoughCreditAction, Sidebar } from "redux/actions";

// Designs
import "./notenoughcredit.scss";

const NotEnoughCredit = () => {
  const dispatch = useDispatch();
  const increaseButtonRef = useRef();

  const handleIncreaseCredit = () => {
    dispatch(NotEnoughCreditAction(false));
    dispatch(Sidebar({ page: "financials" }));
  };

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="notenoughcredit-wrapper"
    >
      <Close
        className="close-modal"
        onClick={() => dispatch(NotEnoughCreditAction(false))}
      />
      <p>اعتبار کافی نیست.</p>
      <Button
        ref={increaseButtonRef}
        title="افزایش اعتبار"
        onClick={handleIncreaseCredit}
      />
    </motion.div>
  );
};

export default NotEnoughCredit;
