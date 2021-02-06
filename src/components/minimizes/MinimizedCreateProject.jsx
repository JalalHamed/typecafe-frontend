import React from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Close from "components/buttons/Close";

// Actions
import { CreateProject } from "redux/actions";

// Desings
import "./minimizedcreateproject.scss";

const MinimizedCreateProject = () => {
  const dispatch = useDispatch();
  const files = useSelector(state => state.CreateProject.files.length);

  const handleClose = e => {
    e.stopPropagation();
    dispatch(
      CreateProject({
        isModalOpen: false,
        step: "uploadpics",
        files: [],
        description: "",
      })
    );
  };

  return (
    <div
      className="minimized-create-project"
      onClick={() => dispatch(CreateProject({ isModalOpen: true }))}
    >
      <Close red className="minimized-cp-close" onClick={e => handleClose(e)} />
      <div className="minimized-cp-details">تعداد عکس‌ها: {files}</div>
    </div>
  );
};

export default MinimizedCreateProject;
