import React from "react";

// Librares
import { useSelector, useDispatch } from "react-redux";

// Components
import Close from "components/buttons/Close";

// Steps
import StepsHeader from "./StepsHeader";
import UploadFile from "./steps/uploadfile/UploadFile";
import Details from "./steps/details/Details";
import ReviewAndSubmit from "./steps/reviewandsubmit/ReviewAndSubmit";

// Actions
import { CreateProject } from "redux/actions";

// Design
import "./createproject.scss";

const CreateNewProject = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.CreateProject);

  return (
    <div className="cp-wrapper">
      <div className="cp-header">
        <p className="cp-header-title no-select">ثبت پروژه</p>
        <Close
          onClick={() => dispatch(CreateProject({ isModalOpen: false }))}
          className="close-modal"
        />
      </div>
      <div className="cp-steps no-select">
        <StepsHeader />
      </div>
      <div className="cp-content">
        {state.step === "uploadfile" && <UploadFile />}
        {state.step === "details" && <Details />}
        {state.step === "reviewandsubmit" && <ReviewAndSubmit />}
      </div>
      <div className="user-agreement">
        با ثبت پروژه خود در تایپ‌کافه، شما با
        <span className="add-project-rules"> قوانین ثبت پروژه </span>
        موافقت می‌کنید.
      </div>
    </div>
  );
};

export default CreateNewProject;
