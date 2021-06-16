import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Button from "components/buttons/Button";
import { fileNameFilter } from "components/helper";

// Actions
import { CreateProject } from "redux/actions";

// Requests
import socket from "requests/socket";
import { handleErrors, CreateProjectReq } from "requests";

// Designs
import "./reviewandsubmit.scss";

const ReviewAndSubmit = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.CreateProject);
  const email = useSelector(state => state.User.email);
  const previousStepRef = useRef();
  const submitRef = useRef();
  const [langs, setLangs] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);

    let body = new FormData();
    body.append("file", state.file);
    body.append("languages_and_additions", langs);
    body.append("number_of_pages", state.numberOfPages);
    body.append("delivery_deadline", state.deliveryDeadline);
    body.append("description", state.description);
    body.append("type", type);

    CreateProjectReq(body)
      .then(res => {
        setLoading(false);
        socket.send(
          JSON.stringify({
            status: "new-project",
            id: res.id,
            user_email: email,
          })
        );
        dispatch(
          CreateProject({
            isModalOpen: false,
            step: "uploadfile",
            file: [],
            description: "",
            languagesAndAdditions: "",
            numberOfPages: "",
            deliveryDeadline: "",
            type: "",
          })
        );
        toast.success("پروژه‌ شما با موفقیت ثبت شد.");
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err);
      });
  };

  useEffect(() => {
    state.languagesAndAdditions.forEach(lang => {
      setLangs(prevState => [...prevState, lang.label]);
    });
  }, [state.languagesAndAdditions]);

  useEffect(() => {
    setType(state.type.label);
  }, [state.type]);

  return (
    <div className="ras-wrapper">
      <div className="ras-review-wrapper">
        <i className="icon icon-zip" />
        <div>
          <p className="label">نام فایل</p>
          <p
            className="mr-12 ltr"
            style={{
              overflow: "auto",
              maxHeight: "56px",
              width: "max-content",
            }}
          >
            {fileNameFilter(state.file.name)}
          </p>
          <p className="label mt-10">حجم فایل</p>
          <p
            className="mr-12 ltr"
            style={{ direction: "rtl", width: "max-content" }}
          >
            {Number(state.file.size / 1000).toFixed(1)} کیلوبایت
          </p>
          <p className="label mt-10">زبان(ها) و پیوست های پروژه</p>
          <p className="mr-12">
            {state.languagesAndAdditions.map(language => language.label + " ")}
          </p>
          <div className="inline mt-10">
            <div>
              <p className="label">تعداد صفحات</p>
              <p className="mr-12">{state.numberOfPages}</p>
            </div>
            <div>
              <p className="label">مهلت انجام (ساعت)</p>
              <p className="mr-12">{state.deliveryDeadline}</p>
            </div>
          </div>
          <p className="label margin-top-7">توضیحات</p>
          <p
            className="mr-12"
            style={{ overflow: "auto", maxHeight: "56px", width: "260px" }}
          >
            {state.description ? state.description : "ـــ"}
          </p>
        </div>
      </div>
      <div className="ras-buttons-wrapper">
        <Button
          ref={previousStepRef}
          onClick={() => dispatch(CreateProject({ step: "details" }))}
          className="prev-step icon icon-previous-step"
        />
        <Button
          ref={submitRef}
          onClick={onSubmit}
          className="next-step"
          title="ثبت"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
