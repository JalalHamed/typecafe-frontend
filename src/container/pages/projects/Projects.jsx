import React, { useEffect, useState } from "react";

// Components
import Project from "components/projects/Project";

// Requests
import { GetProjects } from "requests";

// Design
import "./projects.scss";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetProjects()
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="projects-wrapper">
      {!!projects.length &&
        projects.map(project => {
          return <Project description={project.description} />;
        })}
    </div>
  );
};

export default Projects;
