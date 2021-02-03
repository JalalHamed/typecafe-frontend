import React, { useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Actions
import { LR, CreateProject, SelectedImage } from "redux/actions";

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const LRModalIsOpen = useSelector(state => state.LR.isModalOpen);
  const createProjectModalIsOpen = useSelector(
    state => state.CreateProject.isModalOpen
  );
  const SelectedImageModalIsOpen = useSelector(
    state => state.SelectedImage.isModalOpen
  );

  const escapeHandler = ({ key }) => {
    if (key === "Escape") {
      if (SelectedImageModalIsOpen) {
        dispatch(SelectedImage({ isModalOpen: false }));
      } else {
        if (LRModalIsOpen) dispatch(LR({ isModalOpen: false }));
        if (createProjectModalIsOpen)
          dispatch(CreateProject({ isModalOpen: false }));
      }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-bg" onClick={handleClick}>
      {children}
    </div>
  );
};

export default ModalWrapper;
