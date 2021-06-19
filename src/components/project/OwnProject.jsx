import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import ReceivedOffers from "./open/ReceivedOffers";

const OwnProject = ({ project }) => {
  const isLoading = useSelector(state => state.Offers.offersLoading);

  return (
    <>
      {!isLoading ? (
        <>{project.status === "O" && <ReceivedOffers project={project} />}</>
      ) : (
        <Puffloader color="#1c3987" loading={true} size={100} />
      )}
    </>
  );
};

export default OwnProject;
