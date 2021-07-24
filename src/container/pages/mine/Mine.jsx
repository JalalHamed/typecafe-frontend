import React, { useRef, useEffect, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import Project from "components/project/Project";
import RippleWrapper from "components/ripple/RippleWrapper";

// Actions
import { CreateProject, ProjectsAction } from "redux/actions";

// Design
import "./mine.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const AddProjectRef = useRef();
  const projects = useSelector(state => state.Projects.projects);
  const mine = useSelector(state => state.Projects.mine);
  const myoffers = useSelector(state => state.Offers.myoffers);
  const loading = useSelector(state => state.Projects.myprojectsloading);
  const statusFilter = useSelector(state => state.Projects.mineStatusFilter);
  const projectsOffersFilter = useSelector(
    state => state.Projects.mineProjectsOffersFilter
  );
  const [delivereds, setDelivereds] = useState([]);
  const [hovered, setHovered] = useState("");

  const FilterOption = ({ status, title, filter }) => {
    return (
      <div
        className={`filters-option ${
          statusFilter === status ? status + "-active" : ""
        } ${
          statusFilter !== status && hovered ? status + "-hovered" : ""
        } no-select`}
        onClick={() =>
          filter === "po"
            ? statusFilter !== status &&
              dispatch(ProjectsAction({ mineStatusFilter: status }))
            : projectsOffersFilter !== status &&
              dispatch(ProjectsAction({ mineProjectsOffersFilter: status }))
        }
        onMouseEnter={() => setHovered(status)}
        onMouseLeave={() => setHovered("")}
      >
        {title}
      </div>
    );
  };

  useEffect(() => {
    let delivered = projects.filter(project => project.status === "DELIVERED");
    if (delivered.length) setDelivereds(delivered);
  }, [projects]);

  return (
    <div className="mine-wrapper">
      {loading ? (
        <div className="middle-of-the-page">
          <Puffloader color="#1c3987" loading={loading} size={100} />
        </div>
      ) : (
        <>
          {!mine.length && !myoffers.length ? (
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
          ) : (
            <>
              <div className="filters-wrapper">
                <div className="filter-wrapper">
                  <p className="filters-note">فیلتر پروژه ها و پیشنهاد ها</p>
                  <div className="filters-options-wrapper">
                    {/* po stands for projectsOffers */}
                    <FilterOption title="همه" status="all" filter="po" />
                    <FilterOption
                      title="پروژه ها"
                      status="projects"
                      filter="po"
                    />
                    <FilterOption
                      title="پیشنهاد ها"
                      status="offers"
                      filter="po"
                    />
                  </div>
                </div>
                <div className="filter-wrapper">
                  <p className="filters-note">فیلتر وضعیت پروژه</p>
                  <div className="filters-options-wrapper">
                    <FilterOption title="همه" status="all" filter="status" />
                    <FilterOption
                      title="در دست اجرا"
                      status="in-progress"
                      filter="status"
                    />
                    <FilterOption
                      title="پایان یافته"
                      status="delivered"
                      filter="status"
                    />
                  </div>
                </div>
              </div>
              <div className="horizental-break" />
              {!!myoffers.length && (
                <>
                  {myoffers.map(offer => {
                    let project = projects.find(x => x.id === offer.project);
                    return <Project key={project.id} project={project} />;
                  })}
                </>
              )}
              {!!mine.length && (
                <>
                  {mine.map(project => {
                    return <Project key={project.id} project={project} />;
                  })}
                </>
              )}
              {!!delivereds.length && (
                <>
                  {delivereds.map(project => {
                    return <Project key={project.id} project={project} />;
                  })}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
