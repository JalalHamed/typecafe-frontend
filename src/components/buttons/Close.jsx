import React, { useState } from "react";

// Designs
import "./buttons.scss";

const Close = ({ onClick }) => {
  const [iconMouseOver, setIconMouseOver] = useState(false);

  return (
    <div
      className="close no-select"
      onClick={onClick}
      onMouseEnter={() => setIconMouseOver(true)}
      onMouseLeave={() => setIconMouseOver(false)}
    >
      <i
        className={`icon ${iconMouseOver ? "icon-close-black" : "icon-close"}`}
      />
    </div>
  );
};

export default Close;
