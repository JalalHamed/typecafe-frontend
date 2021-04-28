import React, { useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Actions
import { LR, SelectedImage } from "redux/actions";

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const LRModalIsOpen = useSelector(state => state.LR.isModalOpen);
  const SelectedImageModalIsOpen = useSelector(
    state => state.SelectedImage.isModalOpen
  );

  const escapeHandler = ({ key }) => {
    if (key === "Escape") {
      if (SelectedImageModalIsOpen)
        dispatch(SelectedImage({ isModalOpen: false }));
      if (LRModalIsOpen) dispatch(LR({ isModalOpen: false }));
    }
  };

  const handleClick = () => {
    if (SelectedImageModalIsOpen)
      dispatch(SelectedImage({ isModalOpen: false }));
  };

  useEffect(() => {
    window.addEventListener("keydown", escapeHandler);
    return () => {
      window.removeEventListener("keydown", escapeHandler);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="modal-bg"
      onClick={handleClick}
    >
      {children}
    </motion.div>
  );
};

export default ModalWrapper;
