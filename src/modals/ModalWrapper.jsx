import React, { useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Actions
import { LR, User } from "redux/actions";

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const isLRModalOpen = useSelector(state => state.LR.isModalOpen);
  const isLogoutModalOpen = useSelector(state => state.User.isLogoutModalOpen);

  const downHandler = ({ key }) => {
    if (key === "Escape") {
      if (isLRModalOpen) dispatch(LR({ isModalOpen: false }));
      if (isLogoutModalOpen) dispatch(User({ isLogoutModalOpen: false }));
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

export default ModalWrapper;
