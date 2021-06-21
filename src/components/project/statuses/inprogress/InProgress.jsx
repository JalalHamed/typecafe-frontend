import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { Skewloader } from "components/loader";
import UploadTypedFile from "./UploadTypedFile";

const InProgress = ({ project }) => {
  const user = useSelector(state => state.User);
  const offereds = useSelector(state => state.Offers.offereds);
  const offer = offereds.find(x => x.project === project.id);

  return (
    <>
      {user.id === project.client_id || offer ? (
        <>
          {offer && (
            <UploadTypedFile
              offer={offer}
              deliveryDeadline={project.delivery_deadline}
            />
          )}
        </>
      ) : (
        <Skewloader color="#fca636" />
      )}
    </>
  );
};

export default InProgress;
