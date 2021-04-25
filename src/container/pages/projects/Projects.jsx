import React, { useEffect, useState } from "react";

// Libraries
import { useSelector } from "react-redux";
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
  const getProjects = useSelector(state => state.Project.getProjects);
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
  }, [getProjects]);

  Socket.onmessage = e => {
    if (JSON.parse(e.data).data.type === "time")
      console.log("got message", JSON.parse(e.data));
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
