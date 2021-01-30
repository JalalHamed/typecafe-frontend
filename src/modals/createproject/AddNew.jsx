import React from "react";

// Librares
import { useSelector } from "react-redux";

// Steps
import StepsHeader from "./StepsHeader";
import UploadPics from "./steps/UploadPics";

// Design
import "./addnew.scss";

const AddNew = () => {
  const step = useSelector(state => state.CreateProject.step);

  return (
    <div className="addnew-wrapper">
      <div className="addnew-steps no-select">
        <StepsHeader />
      </div>
      <div className="addnew-content">
        {step === "uploadpics" && <UploadPics />}
      </div>
    </div>
  );
};

export default AddNew;
