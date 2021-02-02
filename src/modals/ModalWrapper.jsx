import React, { useEffect, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Actions
import { LR, CreateProject } from "redux/actions";

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const LRModalIsOpen = useSelector(state => state.LR.isModalOpen);
  const createProjectModalIsOpen = useSelector(
    state => state.CreateProject.isModalOpen
  );
  const ImageModalIsOpen = useSelector(
    state => state.CreateProject.isImageModalOpen
  );
  const [expression, setExperssion] = useState(true);

  const downHandler = ({ key }) => {
    setExperssion(true);
    if (key === "Escape") {
      if (ImageModalIsOpen && expression) {
        console.log("1");
        setExperssion(false);
        dispatch(CreateProject({ isImageModalOpen: false }));
      }
      if (LRModalIsOpen && expression) {
        console.log("2");
        setExperssion(false);
        dispatch(LR({ isModalOpen: false }));
      }
      if (createProjectModalIsOpen && expression) {
        console.log("3");
        setExperssion(false);
        dispatch(CreateProject({ isModalOpen: false }));
      }
    }
  };

  useEffect(() => {
    console.log("expr", expression);
  }, [expression]);

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
