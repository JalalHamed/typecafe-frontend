import React, { useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Project from "components/project/Project";
import { Puffloader } from "components/loader";

// Requests
import { GetMoreProjects, handleErrors } from "requests";

// Actions
import { ProjectsAction } from "redux/actions";

// Design
import "./projects.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.Projects.projects);
  const loading = useSelector(state => state.Projects.loading);
  const nextPage = useSelector(state => state.Projects.next);
  const error = useSelector(state => state.Projects.error);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

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
        handleErrors(err);
      });
  };

  return (
    <div className="projects-wrapper">
      {loading ? (
        <div className="middle-of-the-page">
          <Puffloader color="#1c3987" loading={loading} size={100} />
        </div>
      ) : (
        <>
          {!!projects.length &&
            projects.map(project => (
              <Project key={project.id} project={project} />
            ))}
          {!projects.length && (
            <div className="middle-of-the-page">
              <p className={`no-project-note ${error ? "red" : ""}`}>
                {error ? (
                  <>خطا در برقراری ارتباط با سرور</>
                ) : (
                  <>هنوز پروژه ای ثبت نشده است.</>
                )}
              </p>
            </div>
          )}
          {!!projects.length && nextPage && !loadMoreLoading && (
            <div className="load-more-projects" onClick={handleMoreProjects}>
              بارگذاری موارد بیشتر
            </div>
          )}
          {loadMoreLoading && (
            <Puffloader color="#1c3987" loading={loadMoreLoading} size={100} />
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
