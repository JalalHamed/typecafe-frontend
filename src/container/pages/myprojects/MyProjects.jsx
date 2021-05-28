import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import Project from "components/projects/Project";
import RippleWrapper from "components/ripple/RippleWrapper";

// Actions
import { CreateProject } from "redux/actions";

// Design
import "./myprojects.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.Projects.projects);
  const myprojects = useSelector(state => state.Projects.myprojects);
  const offereds = useSelector(state => state.Projects.offereds);
  const loading = useSelector(state => state.Projects.myprojectsloading);
  const AddProjectRippleRef = useRef();

  return (
    <div className="my-projects-wrapper">
      {!!myprojects.length && (
        <>
          <p className="mp-title">پروژه ها</p>
          {myprojects.map(project => {
            return <Project key={project.id} project={project} />;
          })}
        </>
      )}
      {!!offereds.length && (
        <>
          <p className="mp-title">پیشنهادها</p>
          {offereds.map(offer => {
            let project = projects.find(x => x.id === offer.project);
            return <Project key={project.id} project={project} />;
          })}
        </>
      )}
      {loading && (
        <div className="middle-of-the-page">
          <Puffloader color="#1c3987" loading={loading} size={100} />
        </div>
      )}
      {!loading && !myprojects.length && !offereds.length && (
        <div className="middle-of-the-page">
          <p className="no-project-note">
            هنوز پروژه یا پیشنهادی ثبت نکرده اید.
          </p>
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
