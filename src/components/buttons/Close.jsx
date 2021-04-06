import React, { useState } from "react";

// Designs
import "./buttons.scss";

const Close = ({ onClick, className, red }) => {
  const [iconMouseOver, setIconMouseOver] = useState(false);

  return (
    <div
      className={`close ${red ? "bg-red" : ""} ${
        className ? className : ""
      } no-select`}
      onClick={onClick}
      onMouseEnter={() => setIconMouseOver(true)}
      onMouseLeave={() => setIconMouseOver(false)}
    >
      <i
        className={`icon ${
          iconMouseOver
            ? `${red ? "icon-close-red" : "icon-close-black"}`
            : "icon-close"
        }`}
      />
    </div>
  );
};

export default Close;
