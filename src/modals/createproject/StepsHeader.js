import React from "react";

// Librares
import { useSelector } from "react-redux";

const StepsHeader = () => {
  const step = useSelector(state => state.CreateProject.step);

  return (
    <>
      <p className="step-title bold">آپلود عکس</p>
      <div
        className={`progress-line ${step === "uploadpics" ? "blur" : "bold"}`}
      />
      <p className="step-title blur">توضیحات</p>
      <div className="progress-line blur" />
      <p className="step-title blur">بررسی و ثبت</p>
    </>
  );
};

export default StepsHeader;
