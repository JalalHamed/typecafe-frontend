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
    console.log("submit");
    dispatch(CreateProject({ description, step: "reviewandsubmit" }));
  };

  const handlePrevStep = () => {
    dispatch(CreateProject({ description, step: "uploadpics" }));
  };

  return (
    <form onSubmit={onSubmit} className="details-wrapper">
      <TextArea
        label="توضیح (اختیاری)"
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
          type="button"
        />
        <Button
          ref={nextStepRippleRef}
          onClick={onSubmit}
          className="next-step icon icon-next-step"
          type="submit"
        />
      </div>
    </form>
  );
};

export default Details;
