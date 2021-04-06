import React from "react";

// Librares
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Components
import Close from "components/buttons/Close";

// Steps
import StepsHeader from "./StepsHeader";
import UploadFile from "./steps/uploadfile/UploadFile";
import Details from "./steps/details/Details";
import ReviewAndSubmit from "./steps/reviewandsubmit/ReviewAndSubmit";

// Actions
import { CreateProject, Sidebar } from "redux/actions";

// Design
import "./createproject.scss";

const CreateNewProject = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.CreateProject);

  const handleRulesClick = () => {
    dispatch(CreateProject({ isModalOpen: false }));
    dispatch(Sidebar({ page: "rules" }));
  };

  return (
    <motion.div
      className="cp-wrapper"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
    >
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
        <span className="add-project-rules" onClick={handleRulesClick}>
          {" "}
          قوانین ثبت پروژه{" "}
        </span>
        موافقت می‌کنید.
      </div>
    </motion.div>
  );
};

export default CreateNewProject;
