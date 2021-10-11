// Librares
import { useSelector } from "react-redux";

const StepsHeader = () => {
  const step = useSelector(state => state.CreateProject.step);
  const file = useSelector(state => state.CreateProject.file);
  const detailsComplete = useSelector(
    state => state.CreateProject.detailsComplete
  );

  return (
    <>
      <p className="step-title bold">آپلود فایل</p>
      <div
        className={`progress-line ${
          file && step === "uploadfile" ? "progress-line-signal" : ""
        } ${step === "uploadfile" ? "blur" : "bold"}`}
      />
      <p className={`step-title ${step === "uploadfile" ? "blur" : "bold"}`}>
        جزئیات
      </p>
      <div
        className={`progress-line 
        ${detailsComplete && step === "details" ? "progress-line-signal" : ""}
        ${step === "reviewandsubmit" ? "bold" : "blur"}`}
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
