import React, { useRef, useState } from "react";

// Components
import Button from "components/buttons/Button";

const UploadFiles = () => {
  const chooseFilesRippleRef = useRef();
  const uploadInput = useRef();
  const [imagePrevUrls, setImagePrevUrls] = useState([]);

  const switchToInputFile = () => {
    uploadInput.current.click();
  };

  const handleUploadImage = e => {
    let files = Array.from(e.target.files);
    files.forEach(file => {
      setImagePrevUrls(prevState => [...prevState, URL.createObjectURL(file)]);
    });
  };

  return (
    <div className="upload-pics-wrapper">
      {!imagePrevUrls.length ? (
        <>
          <div className="upload-icon-circle" onClick={switchToInputFile}>
            <i className="icon icon-upload no-select" />
          </div>
          <input
            type="file"
            name="projectpics"
            ref={uploadInput}
            onChange={e => handleUploadImage(e)}
            accept="image/*"
            multiple
            hidden
          />
          <p className="upload-title">عکس‌‌های پروژه‌ی خود را آپلود کنید.</p>
          <p className="upload-valid-formats">
            فرمت‌های مجاز jpeg ،jpg و png می‌باشند.{" "}
          </p>
          <Button
            ref={chooseFilesRippleRef}
            title="انتخاب فایل‌ها"
            className="upload-button"
            onClick={switchToInputFile}
          />
        </>
      ) : (
        <>
          {imagePrevUrls.map((url, index) => {
            return (
              <img
                src={url}
                key={index}
                alt={`imagePrevUrl${index}`}
                className="upload-img-preview"
              />
            );
          })}
          <div>whatever</div>
        </>
      )}
    </div>
  );
};

export default UploadFiles;
