import React, { useRef, useState, useEffect } from "react";

// Components
import Button from "components/buttons/Button";

const UploadFiles = () => {
  const chooseFilesRippleRef = useRef();
  const uploadInput = useRef();
  const [files, setFiles] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();

  const handleUploadClick = () => {
    uploadInput.current.click();
  };

  const handleSelectImage = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFiles(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    console.log("files", files);
    console.log("imagePreviewUrl", imagePreviewUrl);
  }, [files, imagePreviewUrl]);

  return (
    <>
      <div className="upload-icon-circle" onClick={handleUploadClick}>
        <i className="icon icon-upload no-select" />
      </div>
      <input
        type="file"
        name="projectpics"
        ref={uploadInput}
        onChange={e => handleSelectImage(e)}
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
        onClick={handleUploadClick}
      />
      <img src={imagePreviewUrl} alt="imagePreviewUrl" />
    </>
  );
};

export default UploadFiles;
