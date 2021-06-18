import React, { useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Actions
import * as actions from "redux/actions";

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const escapeHandler = ({ key }) => {
    if (key === "Escape") {
      if (state.LR.isModalOpen) dispatch(actions.LR({ isModalOpen: false }));
      if (state.CreateProject.isModalOpen)
        dispatch(actions.CreateProject({ isModalOpen: false }));
      if (state.Profile.isModalOpen)
        dispatch(actions.Profile({ isModalOpen: false }));
      if (state.CreateOffer.isModalOpen)
        dispatch(actions.CreateOffer({ isModalOpen: false }));
      if (state.DeleteProject.isModalOpen)
        dispatch(actions.DeleteProject({ isModalOpen: false }));
      if (state.AoROffer.isModalOpen)
        dispatch(
          actions.AoROfferAction({
            isModalOpen: false,
            id: null,
            project_id: null,
            typist: "",
            typistImage: "",
            offeredPrice: 0,
            totalPrice: 0,
            status: "",
          })
        );
      if (state.NotEnoughCredit) dispatch(actions.NotEnoughCreditAction(false));
      if (state.SelectedImage.isModalOpen)
        dispatch(actions.SelectedImage({ isModalOpen: false, image: "" }));
    }
  };

  const handleClick = () => {
    if (state.SelectedImage.isModalOpen)
      dispatch(actions.SelectedImage({ isModalOpen: false, image: "" }));
  };

  useEffect(() => {
    window.addEventListener("keydown", escapeHandler);
    return () => window.removeEventListener("keydown", escapeHandler);

    // eslint-disable-next-line
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="modal-bg"
      onClick={handleClick}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default ModalWrapper;
