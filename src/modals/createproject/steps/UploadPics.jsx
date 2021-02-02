import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Button from "components/buttons/Button";

// Actions
import { CreateProject } from "redux/actions";

// Designs
import "./uploadpics.scss";

const UploadFiles = () => {
  const dispatch = useDispatch();
  const uploadInput = useRef();
  const chooseFilesRippleRef = useRef();
  const addAnotherRippleRef = useRef();
  const nextStepRippleRef = useRef();
  const [imagePrevUrls, setImagePrevUrls] = useState(
    useSelector(state => state.CreateProject.files)
  );

  const switchToInputFile = () => {
    uploadInput.current.click();
  };

  const handleUploadImage = e => {
    let files = Array.from(e.target.files);
    files.forEach(file => {
      setImagePrevUrls(prevState => [...prevState, URL.createObjectURL(file)]);
    });
  };

  useEffect(() => {
    dispatch(CreateProject({ files: imagePrevUrls }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePrevUrls]);

  const deletePic = url => {
    setImagePrevUrls(imagePrevUrls.filter(el => el !== url));
  };

  return (
    <>
      <input
        type="file"
        name="projectpics"
        ref={uploadInput}
        onChange={e => handleUploadImage(e)}
        accept="image/*"
        multiple
        hidden
      />
      {!imagePrevUrls.length ? (
        <div className="upload-pics-wrapper">
          <div className="upload-icon-circle" onClick={switchToInputFile}>
            <i className="icon icon-upload no-select" />
          </div>
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
        </div>
      ) : (
        <div className="pics-uploaded-parent">
          <div className="pics-uploaded-wrapper">
            {imagePrevUrls.map((url, index) => {
              return (
                <div className="pics-uploaded" key={index}>
                  <div
                    className="delete-pic no-select"
                    onClick={() => deletePic(url)}
                  >
                    x
                  </div>
                  <div className="pics-index">{index + 1}</div>
                  <img
                    src={url}
                    alt={`imagePrevUrl${index}`}
                    className="pic no-select"
                  />
                </div>
              );
            })}
          </div>
          <div className="pics-uploaded-buttons-wrapper">
            <Button
              ref={addAnotherRippleRef}
              className="add-another icon icon-add-pic"
              onClick={switchToInputFile}
            />
            <Button
              ref={nextStepRippleRef}
              className="next-step icon icon-next-step"
              onClick={() => dispatch(CreateProject({ step: "next" }))}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadFiles;
