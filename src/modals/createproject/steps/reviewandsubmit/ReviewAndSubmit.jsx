import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

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
  const [langs, setLangs] = useState([]);
  const [time, setTime] = useState("");

  const onSubmit = () => {
    let body = new FormData();
    body.append("file", state.file);
    body.append("languages_and_additions", langs);
    body.append("number_of_pages", state.numberOfPages);
    body.append("delivery_deadline", time);
    body.append("description", state.description);

    CreateProjectReq(body)
      .then(() => {
        dispatch(
          CreateProject({
            isModalOpen: false,
            step: "uploadpics",
            file: [],
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

  useEffect(() => {
    state.languagesAndAdditions.forEach(lang => {
      setLangs(prevState => [...prevState, lang.label]);
    });

    let d = new Date();
    d.setHours(d.getHours() + state.deliveryDeadline);
    setTime(moment(d).format("YYYY-MM-DD HH:mm"));
  }, [state.languagesAndAdditions, state.deliveryDeadline]);

  return (
    <div className="ras-wrapper">
      <div className="ras-review-wrapper">
        <i className="icon icon-zip" />
        <div>
          <div className="file-detials inline">
            <div>
              <p className="label">حجم فایل</p>
              <p className="margin-right-12" style={{ direction: "rtl" }}>
                {Number(state.file.size / 1000).toFixed(0)} کیلوبایت
              </p>
            </div>
            <div>
              <p className="label">نام فایل</p>
              <p className="margin-right-12">{state.file.name}</p>
            </div>
          </div>
          <p className="label margin-top-10">زبان(ها) و پیوست های پروژه</p>
          <p className="margin-right-12">
            {state.languagesAndAdditions.map(language => language.label + " ")}
          </p>
          <div className="inline margin-top-10">
            <div>
              <p className="label">تعداد صفحات</p>
              <p className="margin-right-12">{state.numberOfPages}</p>
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
      {error && <p className="cp-error-on-submit">{error}</p>}
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
