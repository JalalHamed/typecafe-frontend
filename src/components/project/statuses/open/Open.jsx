import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import ReceivedOffers from "./ReceivedOffers";
import SendOffer from "./SendOffer";

const Open = ({ project }) => {
  const user = useSelector(state => state.User);
  const offersLoading = useSelector(state => state.Offers.offersLoading);
  const porjectsLoading = useSelector(state => state.Projects);

  return (
    <>
      {user.id === project.client_id ? (
        <>
          {!offersLoading ? (
            <ReceivedOffers project={project} />
          ) : (
            <Puffloader color="#1c3987" loading={true} size={100} />
          )}
        </>
      ) : (
        <>
          {!porjectsLoading.myOffersLoading &&
          !porjectsLoading.downloadsLoading ? (
            <SendOffer project={project} />
          ) : (
            <Puffloader color="#1c3987" loading={true} size={100} />
          )}
        </>
      )}
    </>
  );
};

export default Open;
