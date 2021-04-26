import React, { useEffect, useState } from "react";

// Libraries
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

// Components
import Project from "components/projects/Project";

// Requests
import Socket from "requests/Socket";
import { GetProjects } from "requests";

// Design
import "./projects.scss";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetProjects()
      .then(res => {
        setLoading(false);
        setProjects(res);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  Socket.onmessage = e => {
    let data = JSON.parse(e.data);
    if (data.ws_type === "new-project")
      setProjects(prevState => [data, ...prevState]);
    if (data.ws_type === "delete_project")
      setProjects(projects.filter(x => x.id !== data.id));
    console.log("message recieved", data);
  };

  Socket.onopen = () => {
    console.log("socket open");
  };

  Socket.onclose = () => {
    console.log("socket close");
  };

  return (
    <div className="projects-wrapper">
      {!!projects.length &&
        projects.map((project, index) => {
          return <Project key={index} project={project} />;
        })}
      {loading && (
        <div className="middle-of-the-page">
          <PuffLoader
            color={"#1c3987"}
            loading={loading}
            css={override}
            size={100}
          />
        </div>
      )}
      {!loading && !projects.length && (
        <div className="middle-of-the-page">
          <i className="icon icon-leafless-tree" />
          <p className="no-project-note">هنوز پروژه ای ثبت نشده است.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
