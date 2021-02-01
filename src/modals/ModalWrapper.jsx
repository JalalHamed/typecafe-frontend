import React, { useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Actions
import { LR, CreateProject } from "redux/actions";

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const isLRModalOpen = useSelector(state => state.LR.isModalOpen);
  const isCreateProjectModalOpen = useSelector(
    state => state.CreateProject.isModalOpen
  );

  const downHandler = ({ key }) => {
    if (key === "Escape") {
      if (isLRModalOpen) dispatch(LR({ isModalOpen: false }));
      if (isCreateProjectModalOpen)
        dispatch(CreateProject({ isModalOpen: false }));
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
