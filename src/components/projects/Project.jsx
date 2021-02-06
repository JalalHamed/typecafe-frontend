import React from "react";

// Designs
import "./project.scss";

const Project = ({ index, description, image }) => {
  return (
    <div className="project-wrapper" key={index}>
      <div className="project-image-wrapper">
        <img
          src={`http://127.0.0.1:8000${image}`}
          alt={image}
          className="project-image"
        />
      </div>
      <div className="project-details-wrapper">
        <div className="project-description-title">توضیحات</div>
        <div className="project-description">{description}</div>
      </div>
    </div>
  );
};

export default Project;
