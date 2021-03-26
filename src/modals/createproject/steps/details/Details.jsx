import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import TextArea from "components/inputs/TextArea";
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";
import Select from "components/inputs/Select";

// Actions
import { CreateProject } from "redux/actions";

// Designs
import "./details.scss";

const languageOptions = [
  { value: "persian", label: "فارسی" },
  { value: "english", label: "انگلیسی" },
  { value: "arabic", label: "عربی" },
  { value: "table", label: "جدول" },
  { value: "formula", label: "فرمول" },
];

const customStyles = {
  control: styles => {
    return {
      ...styles,
      width: "434px",
    };
  },
};

const Details = () => {
  const dispatch = useDispatch();
  const nextStepRippleRef = useRef();
  const previousStepRippleRef = useRef();
  const [languages, setLanguages] = useState(
    useSelector(state => state.CreateProject.languages)
  );
  const [numberOfPages, setNumberOfPages] = useState(
    useSelector(state => state.CreateProject.numberOfPages)
  );
  const [deliveryDeadline, setDeliveryDeadline] = useState(
    useSelector(state => state.CreateProject.deliveryDeadline)
  );
  const [description, setDescription] = useState(
    useSelector(state => state.CreateProject.description)
  );
  const [detailsComplete, setDetailsComplete] = useState(false);

  const onSubmit = () => {
    dispatch(
      CreateProject({
        description,
        numberOfPages,
        deliveryDeadline,
        languages,
        step: "reviewandsubmit",
      })
    );
  };

  const handlePrevStep = () => {
    dispatch(
      CreateProject({
        description,
        numberOfPages,
        deliveryDeadline,
        languages,
        step: "uploadfile",
      })
    );
  };

  useEffect(() => {
    if (description && numberOfPages && deliveryDeadline && languages) {
      setDetailsComplete(true);
      dispatch(CreateProject({ detailsComplete: true }));
    } else {
      setDetailsComplete(false);
      dispatch(CreateProject({ detailsComplete: false }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, numberOfPages, deliveryDeadline, languages]);

  return (
    <div className="details-wrapper">
      <Select
        isMulti
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null, // removes the seperator bar
        }}
        styles={customStyles}
        name="languages"
        label="زبان‌(ها) و پیوست‌ های پروژه"
        id="languages"
        options={languageOptions}
        placeholder=""
        onChange={val => setLanguages(val)}
        defaultValue={useSelector(state => state.CreateProject.languages)}
      />
      <div style={{ marginBottom: "14px" }} />
      <div className="in-a-row">
        <Input
          label="تعداد صفحات"
          name="number_of_pages"
          id="number_of_pages"
          type="number"
          wrapperStyle={{ width: "48%" }}
          min="1"
          value={numberOfPages}
          onChange={e => setNumberOfPages(e.target.value)}
        />
        <Input
          label="مهلت تحویل (ساعت)"
          name="delivery_deadline"
          id="delivery_deadline"
          type="number"
          wrapperStyle={{ width: "48%" }}
          min="1"
          value={deliveryDeadline}
          onChange={e => setDeliveryDeadline(e.target.value)}
        />
      </div>
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
          disabled={!detailsComplete}
        />
        {!detailsComplete && (
          <p className="complete-all-the-fields-to-continue no-select">
            برای ادامه دادن باید همه‌
            <br />
            فیلد های بالا را کامل کنید.
          </p>
        )}
      </div>
    </div>
  );
};

export default Details;
