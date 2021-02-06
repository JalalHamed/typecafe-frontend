import React from "react";

// Designs
import "./project.scss";

const Project = ({ description }) => {
  return (
    <div className="project-wrapper">
      <div className="project-image"></div>
      <div className="project-details">{description}</div>
    </div>
  );
};

export default Project;
