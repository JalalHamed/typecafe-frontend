import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { Puffloader, Skewloader } from "components/loader";
import SendOffer from "./open/SendOffer";

const OthersProject = ({ project, downloaded }) => {
  const offereds = useSelector(state => state.Offers.offereds);
  const isLoading = useSelector(state => state.Projects);

  return (
    <>
      {!isLoading.offeredsLoading && !isLoading.downloadsLoading ? (
        <>
          {project.status === "O" && (
            <SendOffer project={project} downloaded={downloaded} />
          )}
          {project.status === "IP" && (
            <>
              {offereds.find(x => x.project === project.id) ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "75px",
                      height: "75px",
                      backgroundColor: "#1c39871a",
                      borderRadius: "50%",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <i className="icon icon-upload2" />
                  </div>
                </div>
              ) : (
                <Skewloader color="#fca636" />
              )}
            </>
          )}
        </>
      ) : (
        <Puffloader color="#1c3987" loading={true} size={100} />
      )}
    </>
  );
};

export default OthersProject;
