import React, { useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Project from "components/projects/Project";
import { Puffloader } from "components/loader";

// Requests
import { GetMoreProjects } from "requests";

// Actions
import { ProjectsAction } from "redux/actions";

// Design
import "./projects.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.Projects.projects);
  const loading = useSelector(state => state.Projects.loading);
  const nextPage = useSelector(state => state.Projects.next);
  const [loadMoreloading, setLoadMoreLoading] = useState(false);

  const handleMoreProjects = () => {
    setLoadMoreLoading(true);
    GetMoreProjects(nextPage)
      .then(res => {
        setLoadMoreLoading(false);
        dispatch(
          ProjectsAction({
            projects: [...projects, ...res.results],
          })
        );
        if (res.next) {
          dispatch(ProjectsAction({ next: res.next }));
        } else {
          dispatch(ProjectsAction({ next: "" }));
        }
      })
      .catch(err => {
        setLoadMoreLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="projects-wrapper">
      {!!projects.length &&
        projects.map(project => {
          return <Project key={project.id} project={project} />;
        })}
      {loading && (
        <div className="middle-of-the-page">
          <Puffloader color="#1c3987" loading={loading} size={100} />
        </div>
      )}
      {!loading && !projects.length && (
        <div className="middle-of-the-page">
          <p className="no-project-note">هنوز پروژه ای ثبت نشده است.</p>
        </div>
      )}
      {!!projects.length && nextPage && !loadMoreloading && (
        <div className="load-more-projects" onClick={handleMoreProjects}>
          بارگذاری موارد بیشتر
        </div>
      )}
      {loadMoreloading && (
        <Puffloader color="#1c3987" loading={loadMoreloading} size={100} />
      )}
    </div>
  );
};

export default Projects;
