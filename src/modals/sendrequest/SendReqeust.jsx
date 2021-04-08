import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import { PriceFormat, toFarsiNumber } from "components/helper";

// Actions
import { Project } from "redux/actions";

// Design
import "./sendrequest.scss";

const SendRequest = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const submitButtonRippleRef = useRef();

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
      {Number(state.Project.selectedPricePerPage < 1500) && (
        <div className="price-cant-be-lower">
          قیمت پیشنهادی به ازای هر صفحه نمی‌تواند کمتر از ۱,۵۰۰ تومان باشد.
        </div>
      )}
      {Number(state.Project.selectedPricePerPage) >= 1500 && (
        <>
          <p>{PriceFormat(state.User.credit)}</p>
          <p>
            page count {toFarsiNumber(Number(state.Project.selectedPageCount))}
          </p>
          <p>
            price per page{" "}
            {PriceFormat(Number(state.Project.selectedPricePerPage))}
          </p>
        </>
      )}
      <Button
        ref={submitButtonRippleRef}
        title="تایید"
        className="fit-width submit-button w-49"
      />
    </motion.div>
  );
};

export default SendRequest;
