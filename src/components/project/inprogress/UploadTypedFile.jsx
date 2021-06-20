import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";
import { Skewloader } from "components/loader";

// Designs
import "./inprogress.scss";

const UploadTypedFile = ({ project }) => {
  const uploadRef = useRef();
  const uploadInputRef = useRef();
  const submitRef = useRef();
  const offereds = useSelector(state => state.Offers.offereds);
  const [file, setFile] = useState(null);
  const [badFormat, setBadFormat] = useState(false);

  const openFileInput = () => {
    uploadInputRef.current.click();
  };

  const handleFileChange = e => {
    if (e.target.files[0].type === "application/zip") {
      setFile(e.target.files[0]);
    } else {
      setBadFormat(true);
      toast.error("فرمت فایل انتخاب شده صحیح نمی‌باشد.");
    }
  };

  useEffect(() => {
    console.log("file", file);
  }, [file]);

  return (
    <>
      {offereds.find(x => x.project === project.id) ? (
        <div className="upload-typed-file-wrapper">
          <div className="time-left-wrapper">
            <p className="time-digit">۱</p>
            <p className="time-title">ساعت</p>
            <p className="time-digit">۵۳</p>
            <p className="time-title">دقیقه</p>
            <p className="time-digit">۲۸</p>
            <p className="time-title">ثانیه</p>
          </div>
          <div className="upload-wrapper">
            <input
              type="file"
              name="typedfile"
              ref={uploadInputRef}
              onChange={e => handleFileChange(e)}
              onClick={e => {
                e.target.value = null; // allows uploading the same file over and over
              }}
              accept=".zip"
              hidden
            />
            {!file ? (
              <>
                <div className="upload-icon-circle" onClick={openFileInput}>
                  <i className="icon icon-upload2" />
                </div>
                <p className="upload-typed-file-note">
                  فایل تایپ شده را آپلود کنید.
                </p>
                <p
                  className={`upload-typed-file-valid-format ${
                    badFormat ? "red" : ""
                  }`}
                >
                  فرمت مجاز فقط zip. می‌باشد.
                </p>
                <Button
                  ref={uploadRef}
                  title="انتخاب فایل"
                  className="fit-width no-break upload-button"
                  onClick={openFileInput}
                />
              </>
            ) : (
              <>
                <div className="number-of-pages-and-submit-wrapper">
                  <Input
                    label="تعداد صفحات"
                    type="number"
                    wrapperStyle={{ width: "50%" }}
                    min="1"
                    autoFocus
                  />
                  <Button
                    ref={submitRef}
                    title="ارسال"
                    className="fit-width green submit"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Skewloader color="#fca636" />
      )}
    </>
  );
};

export default UploadTypedFile;
