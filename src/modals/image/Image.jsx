import React, { useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Actions
import { SelectedImage } from "redux/actions";

// Designs
import "./image.scss";

const Image = () => {
  const dispatch = useDispatch();
  const image = useSelector(state => state.SelectedImage.image);
  const [iconMouseOver, setIconMouseOver] = useState(false);

  const handleClose = () => {
    dispatch(SelectedImage({ image: "", isModalOpen: false }));
  };

  const StopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <>
      <img
        src={image}
        alt="typeproject"
        className="selected-image no-select"
        onClick={e => StopPropagation(e)}
        onMouseDown={
          e => (e.preventDefault ? e.preventDefault() : (e.returnValue = false)) // disables dragging
        }
      />
      <div
        className={`close-selected-image no-select icon ${
          iconMouseOver
            ? "icon-close-image-modal-red"
            : "icon-close-image-modal"
        }`}
        onMouseEnter={() => setIconMouseOver(true)}
        onMouseLeave={() => setIconMouseOver(false)}
        onClick={handleClose}
      />
    </>
  );
};

export default Image;
