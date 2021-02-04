import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Button from "components/buttons/Button";
import Close from "components/buttons/Close";

// Actions
import { CreateProject, SelectedImage } from "redux/actions";

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
  const [length, setLength] = useState(0);
  const [carouselForward, setCarouselForward] = useState(false);
  const [carouselBackward, setCarouselBackward] = useState(false);

  const openFileInput = () => {
    uploadInput.current.click();
  };

  const handleUploadImage = e => {
    setImages(prevState => [...prevState, ...Array.from(e.target.files)]);
  };

  const deletePic = (e, file) => {
    e.stopPropagation();
    setImages(images.filter(el => el !== file));
  };

  const handleImageClick = file => {
    dispatch(
      SelectedImage({ image: URL.createObjectURL(file), isModalOpen: true })
    );
  };

  const handleCarouselBackward = () => {
    if (length > 3) setLength(length - 1);
  };

  const handleCarouselForward = () => {
    if (images.length > length) setLength(length + 1);
  };

  useEffect(() => {
    if (images.length > length) {
      setCarouselForward(true);
    } else {
      setCarouselForward(false);
    }

    if (length > 3) {
      setCarouselBackward(true);
    } else {
      setCarouselBackward(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  useEffect(() => {
    dispatch(CreateProject({ files: images }));
    setLength(images.length);
    console.log("images", images);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <>
      <input
        type="file"
        name="projectpics"
        ref={uploadInput}
        onChange={e => handleUploadImage(e)}
        onClick={e => {
          e.target.value = null; // allows uploading the same file over and over
        }}
        accept="image/*"
        multiple
        hidden
      />
      {!length ? (
        <div className="upload-pics-wrapper">
          <div className="upload-icon-circle" onClick={openFileInput}>
            <i className="icon icon-upload no-select" />
          </div>
          <p className="upload-title">عکس‌‌های پروژه‌ی خود را آپلود کنید.</p>
          <p className="upload-valid-formats">
            فرمت‌های مجاز jpeg ،jpg و png می‌باشند.
          </p>
          <Button
            ref={chooseFilesRippleRef}
            title="انتخاب فایل‌ها"
            className="upload-button"
            onClick={openFileInput}
          />
        </div>
      ) : (
        <div className="pics-uploaded-parent">
          <div className="pics-uploaded-wrapper">
            {images
              .slice(length > 2 ? length - 3 : length - 2, length)
              .map((file, index) => {
                return (
                  <div
                    className="pics-uploaded"
                    key={index}
                    onClick={() => handleImageClick(file)}
                  >
                    <Close
                      onClick={e => deletePic(e, file)}
                      className="delete-pic no-select"
                      onMouseOver="icon-close-red"
                    />
                    <div className="pics-index no-select">{index + 1}</div>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`imagepreview${index}`}
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
              onClick={openFileInput}
            />
            <Button
              ref={nextStepRippleRef}
              className="next-step icon icon-next-step"
              onClick={() => dispatch(CreateProject({ step: "next" }))}
            />
          </div>
          {carouselBackward && (
            <div
              className="carousel-backward icon icon-previous-step-black no-select"
              onClick={handleCarouselBackward}
            />
          )}
          {carouselForward && (
            <div
              className="carousel-forward icon icon-next-step-black no-select"
              onClick={handleCarouselForward}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default UploadFiles;
