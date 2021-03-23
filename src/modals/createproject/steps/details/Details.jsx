import React, { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import TextArea from "components/inputs/TextArea";
import Button from "components/buttons/Button";

// Actions
import { CreateProject } from "redux/actions";

// Designs
import "./details.scss";

const Details = () => {
  const dispatch = useDispatch();
  const nextStepRippleRef = useRef();
  const previousStepRippleRef = useRef();
  const [description, setDescription] = useState(
    useSelector(state => state.CreateProject.description)
  );

  const onSubmit = () => {
    dispatch(CreateProject({ description, step: "reviewandsubmit" }));
  };

  const handlePrevStep = () => {
    dispatch(CreateProject({ description, step: "uploadfile" }));
  };

  return (
    <div className="details-wrapper">
      <TextArea
        label="توضیحات"
        id="description"
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="details-buttons-wrapper">
        <Button
          ref={previousStepRippleRef}
          onClick={handlePrevStep}
          className="prev-step icon icon-previous-step"
        />
        <Button
          ref={nextStepRippleRef}
          onClick={onSubmit}
          className="next-step icon icon-next-step"
        />
      </div>
    </div>
  );
};

export default Details;
