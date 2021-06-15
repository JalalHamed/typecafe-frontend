import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Actions
import { CreateProject } from "redux/actions";

// Components
import Button from "components/buttons/Button";
import Close from "components/buttons/Close";
import ArrowStem from "./ArrowStem";
import ArrowCap from "./ArrowCap";
import { fileNameFilter } from "components/helper";

// Designs
import "./uploadfile.scss";

const UploadFiles = () => {
  const dispatch = useDispatch();
  const uploadInput = useRef();
  const chooseFilesRef = useRef();
  const nextStepRef = useRef();
  const firstMount = useSelector(state => state.CreateProject.firstMount);
  const [file, setFile] = useState(
    useSelector(state => state.CreateProject.file)
  );
  const [badFormat, setBadFormat] = useState(false);

  const openFileInput = () => {
    uploadInput.current.click();
  };

  const goToNextStep = () => {
    dispatch(CreateProject({ step: "details", firstMount: false }));
  };

  const closeFile = () => {
    dispatch(CreateProject({ file: "" }));
    setFile("");
  };

  useEffect(() => {
    setBadFormat(false);
    if (file.name)
      if (file.type === "application/zip") {
        dispatch(CreateProject({ file }));
      } else {
        setBadFormat(true);
      }

    // eslint-disable-next-line
  }, [file]);

  return (
    <>
      <input
        type="file"
        name="projectfile"
        ref={uploadInput}
        onChange={e => setFile(e.target.files[0])}
        onClick={e => {
          e.target.value = null; // allows uploading the same file over and over
        }}
        accept=".zip"
        hidden
      />
      <div className="upload-file-wrapper">
        {!file.name || badFormat ? (
          <>
            <div className="upload-icon-circle" onClick={openFileInput}>
              <i className="icon icon-upload no-select" />
            </div>
            <p className="upload-title">فایل پروژه‌ی خود را آپلود کنید.</p>
            <p className="upload-valid-formats">
              محتوای پروژه‌ی خود (عکس، PDF، فایل صوتی و ...) را فشرده‌سازی کرده
              و سپس آپلود کنید.
              <br />
              <span className={`${badFormat && "badformat"}`}>
                فرمت مجاز فقط zip. می‌باشد.
              </span>
            </p>
            <Button
              ref={chooseFilesRef}
              title="انتخاب فایل‌"
              className="upload-button"
              onClick={openFileInput}
            />
            {badFormat && (
              <p className="error">فرمت فایل انتخاب شده صحیح نمی‌باشد.</p>
            )}
          </>
        ) : (
          <>
            <div className="file-wrapper">
              <Close className="cancel-file" red onClick={closeFile} />
              <i className="icon icon-zip" style={{ textAlign: "center" }} />
              <div className="file-detials">
                <p className="label">نام فایل</p>
                <p style={{ width: "max-content" }}>
                  {fileNameFilter(file.name)}&nbsp;&nbsp;
                </p>
                <p className="label">حجم فایل</p>
                <p
                  style={{
                    direction: "rtl",
                    width: "max-content",
                    float: "right",
                  }}
                >
                  &nbsp;&nbsp;{Number(file.size / 1000).toFixed(1)} کیلوبایت
                </p>
              </div>
            </div>
            <div className="file-uploaded-buttons-wrapper">
              {firstMount && (
                <>
                  <div className="next-step-tooltip">قدم بعد</div>
                  <div className="ns-arrow-stem">
                    <ArrowStem />
                  </div>
                  <div className="ns-arrow-cap">
                    <ArrowCap />
                  </div>
                </>
              )}
              <Button
                ref={nextStepRef}
                className="next-step icon icon-next-step"
                onClick={goToNextStep}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UploadFiles;
