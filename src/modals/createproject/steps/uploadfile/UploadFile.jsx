import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useSelector } from "react-redux";

// Actions
// import { CreateProject } from "redux/actions";

// Components
import Button from "components/buttons/Button";

// Designs
import "./uploadfile.scss";

const UploadFiles = () => {
  // const dispatch = useDispatch();
  const uploadInput = useRef();
  const chooseFilesRippleRef = useRef();
  const [file, setFile] = useState(
    useSelector(state => state.CreateProject.file)
  );
  const [badFormat, setBadFormat] = useState(false);

  const openFileInput = () => {
    uploadInput.current.click();
  };

  useEffect(() => {
    console.log(file);
    setBadFormat(false);
    if (file.name)
      if (file.type === "application/zip") {
        // dispatch(CreateProject({ file, step: "details" }));
      } else {
        setBadFormat(true);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <input
        type="file"
        name="projectpics"
        ref={uploadInput}
        onChange={e => setFile(e.target.files[0])}
        accept=".zip"
        hidden
      />
      <div className="upload-pics-wrapper">
        {!file.name ? (
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
              ref={chooseFilesRippleRef}
              title="انتخاب فایل‌"
              className="upload-button"
              onClick={openFileInput}
            />
            {badFormat && (
              <p className="error">فرمت فایل انتخاب شده اشتباه است.</p>
            )}
          </>
        ) : (
          <div className="file-wrapper">
            <i className="icon icon-zip" style={{ textAlign: "center" }} />
            <div className="file-detials">
              <p className="label">نام فایل</p>
              <p>{file.name}&nbsp;&nbsp;</p>
              <p className="label">حجم فایل</p>
              <p style={{ direction: "rtl" }}>
                &nbsp;&nbsp;{Number(file.size / 1000).toFixed(0)} کیلوبایت
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFiles;
