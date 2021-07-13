import React from "react";

// Designs
import "./Delivered.scss";

const Delivered = ({ project, offer, myoffer }) => {
  return (
    <div>
      {offer || myoffer ? (
        <>one the owners</>
      ) : (
        <i className="icon icon-check-green-large" />
      )}
    </div>
  );
};

export default Delivered;
