import React, { useEffect, useState } from "react";

// Libraries
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

// Components
import Project from "components/projects/Project";

// Requests
import Socket from "requests/Socket";
import { GetProjects, GetMoreProjects } from "requests";

// Design
import "./projects.scss";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [loadMoreloading, setLoadMoreLoading] = useState(false);

  const handleMoreProjects = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      GetMoreProjects(nextPage)
        .then(res => {
          setLoadMoreLoading(false);
          setProjects(prevState => [...prevState, ...res.results]);
          if (res.next) {
            setNextPage(res.next);
          } else {
            setNextPage("");
          }
        })
        .catch(err => {
          setLoadMoreLoading(false);
          console.log(err);
        });
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);
    GetProjects()
      .then(res => {
        setLoading(false);
        setProjects(res.results);
        if (res.next) {
          setNextPage(res.next);
        } else {
          setNextPage("");
        }
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
      {!!projects.length && nextPage && !loadMoreloading && (
        <div className="load-more-projects" onClick={handleMoreProjects}>
          بارگذاری موارد بیشتر
        </div>
      )}
      {loadMoreloading && (
        <PuffLoader
          color={"#1c3987"}
          loading={loadMoreloading}
          css={override}
          size={100}
        />
      )}
    </div>
  );
};

export default Projects;
