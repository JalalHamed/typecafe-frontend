import React, { useState, useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

// Components
import Project from "components/projects/Project";
import RippleWrapper from "components/ripple/RippleWrapper";

// Actions
import { CreateProject } from "redux/actions";

// Requests
import Socket from "requests/Socket";

// Design
import "./myprojects.scss";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Projects = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.Projects.myprojectsloading);
  const AddProjectRippleRef = useRef();
  const [projects, setProjects] = useState([]);

  Socket.onmessage = e => {
    let data = JSON.parse(e.data);
    if (data.ws_type === "new-project")
      setProjects(prevState => [data, ...prevState]);
    if (data.ws_type === "delete-project")
      setProjects(projects.filter(x => x.id !== data.id));
  };

  return (
    <div className="projects-wrapper">
      {!!projects.length &&
        projects.map(project => {
          return <Project key={project.id} project={project} />;
        })}
      {loading && (
        <div className="middle-of-the-page">
          <PuffLoader
            color={"#1c3987"}
            loading={loading}
            css={override}
            size={100}
          />
        </div>
      )}
      {!loading && !projects.length && (
        <div className="middle-of-the-page">
          <i className="icon icon-leafless-tree" />
          <p className="no-project-note">هنوز پروژه ای ثبت نکرده اید.</p>
          <RippleWrapper
            ref={AddProjectRippleRef}
            className="add-a-project-wrapper no-select"
            onClick={() => dispatch(CreateProject({ isModalOpen: true }))}
          >
            <p className="add-a-project-right-now">یک پروژه ثبت کنید</p>
          </RippleWrapper>
        </div>
      )}
    </div>
  );
};

export default Projects;
