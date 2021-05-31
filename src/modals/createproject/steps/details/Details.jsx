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

const typeOptions = [
  { value: "handwritten", label: "دست‌نویس" },
  { value: "typographic", label: "چاپی" },
];

const selectLangStyles = {
  control: styles => {
    return {
      ...styles,
      width: "550px",
    };
  },
};

const selectTypeStyles = {
  control: styles => {
    return {
      ...styles,
      width: "165px",
    };
  },
};

const Details = () => {
  const dispatch = useDispatch();
  const nextStepRef = useRef();
  const previousStepRef = useRef();
  const [languagesAndAdditions, setLanguagesAndAdditions] = useState(
    useSelector(state => state.CreateProject.languagesAndAdditions)
  );
  const [numberOfPages, setNumberOfPages] = useState(
    useSelector(state => state.CreateProject.numberOfPages)
  );
  const [deliveryDeadline, setDeliveryDeadline] = useState(
    useSelector(state => state.CreateProject.deliveryDeadline)
  );
  const [type, setType] = useState(
    useSelector(state => state.CreateProject.type)
  );
  const [description, setDescription] = useState(
    useSelector(state => state.CreateProject.description)
  );
  const [detailsComplete, setDetailsComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "برای ادامه دادن باید همه‌ فیلد های بالا را کامل کنید."
  );

  const onSubmit = () => {
    // numberize the numbers
    let nof = Number(numberOfPages);
    let ddl = Number(deliveryDeadline);

    dispatch(
      CreateProject({
        description,
        numberOfPages: nof,
        deliveryDeadline: ddl,
        languagesAndAdditions,
        type,
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
        languagesAndAdditions,
        type,
        step: "uploadfile",
      })
    );
  };

  // this whole thing handles errors
  useEffect(() => {
    // numberize the numbers
    let nof = Number(numberOfPages);
    let ddl = Number(deliveryDeadline);

    if (
      nof > 0 &&
      ddl > 0 &&
      languagesAndAdditions &&
      type &&
      Number.isInteger(ddl)
    ) {
      setDetailsComplete(true);
    } else {
      setDetailsComplete(false);
      if (nof && nof < 1) {
        setErrorMsg("تعداد صفحات نمی‌تواند کوچکتر از 1 باشد.");
      } else if (ddl && ddl < 1) {
        setErrorMsg("مهلت تحویل نمی‌تواند کوچکتر از 1 باشد.");
      } else if (nof && !Number.isInteger(nof)) {
        setErrorMsg("تعداد صفحات نمی‌تواند یک عدد اعشاری باشد.");
      } else if (ddl && !Number.isInteger(ddl)) {
        setErrorMsg("مهلت تحویل نمی‌تواند یک عدد اعشاری باشد.");
      } else {
        setErrorMsg("برای ادامه دادن باید فیلد های بالا را کامل کنید.");
      }
    }

    // eslint-disable-next-line
  }, [
    description,
    numberOfPages,
    deliveryDeadline,
    languagesAndAdditions,
    type,
  ]);

  return (
    <div className="details-wrapper">
      <Select
        isMulti
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null, // removes the seperator bar
        }}
        styles={selectLangStyles}
        name="languagesAndAdditions"
        label="زبان‌(ها) و پیوست‌ های پروژه"
        id="languagesAndAdditions"
        options={languageOptions}
        placeholder=""
        onChange={val => setLanguagesAndAdditions(val)}
        defaultValue={useSelector(
          state => state.CreateProject.languagesAndAdditions
        )}
      />
      <div style={{ marginBottom: "14px" }} />
      <div className="in-a-row">
        <Input
          label="تعداد صفحات"
          name="number_of_pages"
          id="number_of_pages"
          type="number"
          wrapperStyle={{ width: "30%" }}
          min="1"
          value={numberOfPages}
          onChange={e => setNumberOfPages(e.target.value)}
        />
        <Input
          label="مهلت تحویل (ساعت)"
          name="delivery_deadline"
          id="delivery_deadline"
          type="number"
          wrapperStyle={{ width: "30%" }}
          min="1"
          value={deliveryDeadline}
          onChange={e => setDeliveryDeadline(e.target.value)}
        />
        <Select
          isSearchable={false}
          styles={selectTypeStyles}
          name="type"
          label="چاپی یا دست‌نویس"
          id="type"
          options={typeOptions}
          placeholder=""
          onChange={val => setType(val)}
          defaultValue={useSelector(state => state.CreateProject.type)}
        />
      </div>
      <TextArea
        label="توضیحات"
        id="description"
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        optional
      />
      <div className="details-buttons-wrapper">
        <Button
          ref={previousStepRef}
          onClick={handlePrevStep}
          className="prev-step icon icon-previous-step"
        />
        <Button
          ref={nextStepRef}
          onClick={onSubmit}
          className="next-step icon icon-next-step"
          disabled={!detailsComplete}
        />
        {!detailsComplete && (
          <p className="complete-all-the-fields-to-continue no-select">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default Details;
