import React, { useRef } from "react";

// Components
import Button from "components/buttons/Button";

const UploadFiles = () => {
  const UploadRippleRef = useRef();

  return (
    <>
      <div className="upload-icon-circle">
        <i className="icon icon-upload" />
      </div>
      <input type="file" hidden />
      <p className="upload-title">فایل های پروژه‌ی خود را آپلود کنید.</p>
      <p className="upload-valid-formats">
        فرمت های مجاز jpeg ،jpg ،zip و png می‌باشند.{" "}
      </p>
      <Button
        ref={UploadRippleRef}
        title="انتخاب فایل‌ها"
        className="upload-button"
      />
    </>
  );
};

export default UploadFiles;
