import React from "react";

// Librares
import { useSelector } from "react-redux";

const StepsHeader = () => {
  const step = useSelector(state => state.CreateProject.step);

  return (
    <>
      <p className="step-title bold">آپلود فایل</p>
      <div
        className={`progress-line ${step === "uploadfile" ? "blur" : "bold"}`}
      />
      <p className={`step-title ${step === "uploadfile" ? "blur" : "bold"}`}>
        جزئیات
      </p>
      <div
        className={`progress-line ${
          step === "reviewandsubmit" ? "bold" : "blur"
        }`}
      />
      <p
        className={`step-title ${step === "reviewandsubmit" ? "bold" : "blur"}`}
      >
        بررسی و ثبت
      </p>
    </>
  );
};

export default StepsHeader;
