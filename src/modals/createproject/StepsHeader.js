import React from "react";

// Librares
import { useSelector } from "react-redux";

const StepsHeader = () => {
  const step = useSelector(state => state.CreateProject.step);
  const image = useSelector(state => state.CreateProject.files.length);

  return (
    <>
      <p className="step-title bold">آپلود عکس</p>
      <div
        className={`progress-line ${
          image && step === "uploadpics" && "progress-line-signal"
        } ${step === "uploadpics" ? "blur" : "bold"}`}
      />
      <p
        className={`step-title blur ${step === "uploadpics" ? "blur" : "bold"}`}
      >
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
