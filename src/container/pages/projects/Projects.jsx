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
  const getProjects = useSelector(state => state.Projects.getprojects);
  const [projects, setProjects] = useState([]);

  const get = () => {
    GetProjects()
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    get();
  }, [getProjects]);

  return (
    <div className="projects-wrapper">
      {!!projects.length ? (
        projects.map((project, index) => {
          return (
            <Project
              key={index}
              createAt={project.created_at}
              client={project.client}
              description={project.description}
              clientPicture={project.client_picture}
              status={project.status}
            />
          );
        })
      ) : (
        <div>هنوز پروژه ای ثبت نشده</div>
      )}
    </div>
  );
};

export default Projects;
