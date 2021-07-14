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
  const filter = useSelector(state => state.Projects.projectsFilter);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [hovered, setHovered] = useState("");

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

  const FilterOption = ({ status, title }) => {
    return (
      <div
        className={`filters-option ${
          filter === status ? status + "-active" : ""
        } ${filter !== status && hovered ? status + "-hovered" : ""} no-select`}
        onClick={() =>
          filter !== status &&
          dispatch(ProjectsAction({ projectsFilter: status }))
        }
        onMouseEnter={() => setHovered(status)}
        onMouseLeave={() => setHovered("")}
      >
        {title}
      </div>
    );
  };

  return (
    <div className="projects-wrapper">
      {loading ? (
        <div className="middle-of-the-page">
          <Puffloader color="#1c3987" loading={loading} size={100} />
        </div>
      ) : (
        <>
          <div className="filters-wrapper">
            <div className="filters-title-wrapper">
              <i className="icon icon-filter" />
              <p className="filters-note">فیلتر وضعیت پروژه</p>
            </div>
            <div className="filters-options-wrapper">
              <FilterOption title="همه" status="all" />
              <FilterOption title="باز" status="open" />
              <FilterOption title="در دست اجرا" status="in-progress" />
              <FilterOption title="پایان یافته" status="delivered" />
            </div>
          </div>
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
