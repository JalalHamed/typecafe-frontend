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
      {!!projects.length ? (
        projects.map((project, index) => {
          return (
            <Project
              key={index}
              createAt={project.created_at}
              client={project.client}
              description={project.description}
              image={project.files}
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
