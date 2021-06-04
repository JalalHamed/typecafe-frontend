import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import Project from "components/project/Project";
import RippleWrapper from "components/ripple/RippleWrapper";
import { farsiNumber } from "components/helper";

// Actions
import { CreateProject } from "redux/actions";

// Design
import "./myprojects.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.Projects.projects);
  const myprojects = useSelector(state => state.Projects.myprojects);
  const offereds = useSelector(state => state.Offers.offereds);
  const loading = useSelector(state => state.Projects.myprojectsloading);
  const AddProjectRef = useRef();

  return (
    <div className="my-projects-wrapper">
      {!!myprojects.length && (
        <>
          <p className="mp-title">پروژه ها</p>
          <div className="mp-counter">({farsiNumber(myprojects.length)})</div>
          {myprojects.map(project => {
            return <Project key={project.id} project={project} />;
          })}
        </>
      )}
      {!!offereds.length && (
        <>
          <p className="mp-title">پیشنهادها</p>
          <div className="mp-counter">({farsiNumber(offereds.length)})</div>
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
            ref={AddProjectRef}
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
