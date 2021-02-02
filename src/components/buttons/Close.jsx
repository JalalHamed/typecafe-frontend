import React, { useState } from "react";

// Designs
import "./buttons.scss";

const Close = ({ onClick, className, onMouseOver }) => {
  const [iconMouseOver, setIconMouseOver] = useState(false);

  return (
    <div
      className={`close no-select ${className && className}`}
      onClick={onClick}
      onMouseEnter={() => setIconMouseOver(true)}
      onMouseLeave={() => setIconMouseOver(false)}
    >
      <i
        className={`icon ${
          iconMouseOver
            ? `${onMouseOver ? onMouseOver : "icon-close-black"}`
            : "icon-close"
        }`}
      />
    </div>
  );
};

export default Close;
