import React from "react";

// Designs
import "./Delivered.scss";

const Delivered = ({ project, offer, offered }) => {
  return (
    <div>
      {offer || offered ? (
        <>one the owners</>
      ) : (
        <i className="icon icon-check-green-large" />
      )}
    </div>
  );
};

export default Delivered;
