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
  const state = useSelector(state => state);

  return (
    <div
      className="minimized-create-project"
      onClick={() => dispatch(CreateProject({ isModalOpen: true }))}
    >
      <Close className="minimized-cp-close" red />
      <div className="minimized-cp-details">
        تعداد عکس‌ها: {state.CreateProject.files.length}
      </div>
    </div>
  );
};

export default MinimizedCreateProject;
