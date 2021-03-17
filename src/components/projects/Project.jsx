import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Actions
import { SelectedImage } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./project.scss";

const Project = ({
  index,
  description,
  image,
  client,
  clientPicture,
  status,
}) => {
  const dispatch = useDispatch();
  const handleImageClick = e => {
    dispatch(SelectedImage({ image: e.target.src, isModalOpen: true }));
  };

  return (
    <div className="project-wrapper" key={index}>
      <div className="project-image-wrapper">
        <img
          src={baseURL + image}
          alt={image}
          className="project-image"
          onClick={e => handleImageClick(e)}
        />
      </div>
      <div className="project-details-wrapper">
        <div className="client-wrapper">
          {!!clientPicture ? (
            <img
              src={baseURL + clientPicture}
              alt="User Profile"
              className="client-image"
            />
          ) : (
            <i className="icon post-profile-pic" />
          )}
          <div className="client-name">{client}</div>
        </div>
        {!!description && (
          <>
            <div className="project-description-title">توضیحات</div>
            <div className="project-description">{description}</div>
          </>
        )}
        {status === "OP" && "وضعیت پروژه بازه"}
      </div>
    </div>
  );
};

export default Project;
