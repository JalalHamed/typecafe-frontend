import React from "react";

// Librares
import { useSelector } from "react-redux";

// Steps
import UploadFiles from "./steps/UploadFiles";

// Design
import "./addnew.scss";

const AddNew = () => {
  const step = useSelector(state => state.Project.addnew.step);

  return (
    <div className="addnew-wrapper">
      <div className="addnew-steps">
        <p className="step-title bold">آپلود فایل</p>
        <div className="progress-line blur" />
        <p className="step-title blur">توضیحات</p>
        <div className="progress-line blur" />
        <p className="step-title blur">بررسی و ثبت</p>
      </div>
      <div className="addnew-content">
        {step === "uploadfiles" && <UploadFiles />}
      </div>
    </div>
  );
};

export default AddNew;
