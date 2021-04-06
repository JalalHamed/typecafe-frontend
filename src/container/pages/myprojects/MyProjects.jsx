import React, { useEffect, useState, useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

// Components
import Project from "components/projects/Project";
import RippleWrapper from "components/ripple/RippleWrapper";

// Actions
import { CreateProject } from "redux/actions";

// Requests
import { GetMyProjects } from "requests";

// Design
import "./myprojects.scss";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Projects = () => {
  const dispatch = useDispatch();
  const AddProjectRippleRef = useRef();
  const getProjects = useSelector(state => state.Project.getProjects);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetMyProjects()
      .then(res => {
        setLoading(false);
        setProjects(res);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [getProjects]);

  return (
    <div className="projects-wrapper">
      {!!projects.length &&
        projects.map((project, index) => {
          return <Project key={index} project={project} />;
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
