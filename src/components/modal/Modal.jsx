import React, { useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Actions
import { closeLRModal, LRModal } from "redux/actions";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const LRModalIsOpen = useSelector(state => state.LRModal.isOpen);

  const downHandler = ({ key }) => {
    if (key === "Escape") {
      if (LRModalIsOpen) {
        dispatch(LRModal({ page: "Email" }));
        dispatch(closeLRModal());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="modal-bg">{children}</div>;
};

export default Modal;
