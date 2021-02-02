import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Button from "components/buttons/Button";
import Close from "components/buttons/Close";

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
  const files = useSelector(state => state.CreateProject.files);
  const [images, setImages] = useState(files);

  const switchToInputFile = () => {
    uploadInput.current.click();
  };

  const handleUploadImage = e => {
    setImages(prevState => [...prevState, ...Array.from(e.target.files)]);
  };

  const deletePic = file => {
    setImages(images.filter(el => el !== file));
  };

  useEffect(() => {
    dispatch(CreateProject({ files: images }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    console.log(files);
  }, [files]);

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
      {!images.length ? (
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
            {images.map((file, index) => {
              return (
                <div
                  className="pics-uploaded"
                  key={index}
                  onClick={() =>
                    dispatch(CreateProject({ isImageModalOpen: true }))
                  }
                >
                  <Close
                    onClick={() => deletePic(file)}
                    className="delete-pic no-select"
                    onMouseOver="icon-close-red"
                  />
                  <div className="pics-index no-select">{index + 1}</div>
                  <img
                    src={URL.createObjectURL(file)}
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
