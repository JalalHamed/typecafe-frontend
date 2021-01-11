import React, { useEffect } from "react";

// Libraries
import { useDispatch } from "react-redux";

// Actions
import { closelRModal } from "redux/actions";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const downHandler = ({ key }) => {
    if (key === "Escape") {
      dispatch(closelRModal());
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
