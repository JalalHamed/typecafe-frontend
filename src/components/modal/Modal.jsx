import React, { useEffect } from "react";

// Libraries
import { useDispatch } from "react-redux";

// Actions
import { closeLoginRegisterModal } from "redux/actions";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const downHandler = ({ key }) => {
    if (key === "Escape") {
      dispatch(closeLoginRegisterModal());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      dispatch(closeLoginRegisterModal());
    }
  };

  return (
    <div className="modal-bg" onClick={e => handleClick(e)}>
      {children}
    </div>
  );
};

export default Modal;
