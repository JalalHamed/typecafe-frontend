import React, { useEffect, useState } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import Project from "components/projects/Project";

// Requests
import { GetProjects } from "requests";

// Design
import "./projects.scss";

const Projects = () => {
  const getProjects = useSelector(state => state.Projects.getProjects);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetProjects()
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  }, [getProjects]);

  return (
    <div className="projects-wrapper">
      {!!projects.length ? (
        projects.map((project, index) => {
          return <Project key={index} project={project} />;
        })
      ) : (
        <div>هنوز پروژه ای ثبت نشده</div>
      )}
    </div>
  );
};

export default Projects;
