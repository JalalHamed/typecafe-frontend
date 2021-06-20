import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import SendOffer from "./open/SendOffer";
import UploadTypedFile from "./inprogress/UploadTypedFile";

const OthersProject = ({ project }) => {
  const isLoading = useSelector(state => state.Projects);

  return (
    <>
      {!isLoading.offeredsLoading && !isLoading.downloadsLoading ? (
        <>
          {project.status === "O" && <SendOffer project={project} />}
          {project.status === "IP" && <UploadTypedFile project={project} />}
        </>
      ) : (
        <Puffloader color="#1c3987" loading={true} size={100} />
      )}
    </>
  );
};

export default OthersProject;
