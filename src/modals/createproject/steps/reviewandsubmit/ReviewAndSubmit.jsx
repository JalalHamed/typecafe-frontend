import React, { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Button from "components/buttons/Button";

// Actions
import { CreateProject, Projects } from "redux/actions";

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
    body.append("image", state.files[0]);

    CreateProjectReq(body)
      .then(() => {
        dispatch(
          CreateProject({
            isModalOpen: false,
            step: "uploadpics",
            files: [],
            description: "",
            languages: "",
            numberOfPages: "",
            deliveryDeadline: "",
          })
        );
        dispatch(Projects({ getprojects: 1 }));
        toast.success("پروژه‌ شما با موفقیت ثبت شد.");
      })
      .catch(err => handleErrors(err, setError));
  };

  return (
    <div className="ras-wrapper">
      <div className="ras-review-wrapper">
        <i className="icon icon-zip" />
        <div>
          <div className="file-detials inline">
            <div>
              <p className="label">حجم فایل</p>
              <p style={{ direction: "rtl" }}>
                &nbsp;&nbsp;{Number(state.file.size / 1000).toFixed(0)} کیلوبایت
              </p>
            </div>
            <div>
              <p className="label">نام فایل</p>
              <p>{state.file.name}&nbsp;&nbsp;</p>
            </div>
          </div>
          <p className="label margin-top-10">زبان(ها) و پیوست های پروژه</p>
          <p className="margin-right-12">
            {state.languages.map(language => language.label + " ")}
          </p>
          <div className="inline margin-top-10">
            <div>
              <p className="label">تعداد صفحات</p>
              <p className="margin-right-12">{state.deliveryDeadline}</p>
            </div>
            <div>
              <p className="label">مهلت انجام (ساعت)</p>
              <p className="margin-right-12">{state.deliveryDeadline}</p>
            </div>
          </div>
          <p className="label margin-top-7">توضیحات</p>
          <p
            className="margin-right-12"
            style={{ overflow: "auto", maxHeight: "56px", width: "260px" }}
          >
            {state.description}
          </p>
        </div>
      </div>
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
