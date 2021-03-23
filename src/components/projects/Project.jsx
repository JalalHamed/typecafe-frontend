import React from "react";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./project.scss";

const Project = ({ index, description, client, clientPicture, status }) => {
  return (
    <div className="project-wrapper" key={index}>
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
        <div className="project-description-title">توضیحات</div>
        <div className="project-description">{description}</div>
        {status === "OP" && "وضعیت پروژه بازه"}
      </div>
    </div>
  );
};

export default Project;
