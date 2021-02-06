import React, { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Button from "components/buttons/Button";

// Actions
import { CreateProject } from "redux/actions";

// Requests
import { handleErrors, CreateProjectReq } from "requests";

// Designs
import "./reviewandsubmit.scss";

const ReviewAndSubmit = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.CreateProject);
  const previousStepRippleRef = useRef();
  const submitRippleRef = useRef();
  const [error, setError] = useState("");

  const onSubmit = () => {
    let body = new FormData();
    body.append("description", state.description);
    body.append("files", state.files[0]);

    CreateProjectReq(body)
      .then(() =>
        dispatch(
          CreateProject({
            isModalOpen: false,
            step: "uploadpics",
            files: [],
            description: "",
          })
        )
      )
      .catch(err => handleErrors(err, setError));
  };

  return (
    <div className="ras-wrapper">
      {error && <p>{error}</p>}
      <div className="ras-buttons-wrapper">
        <Button
          ref={previousStepRippleRef}
          onClick={() => dispatch(CreateProject({ step: "details" }))}
          className="prev-step icon icon-previous-step"
        />
        <Button
          ref={submitRippleRef}
          onClick={onSubmit}
          className="next-step"
          title="ثبت"
        />
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
