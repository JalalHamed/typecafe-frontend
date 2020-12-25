import React from "react";

// Libraries
import { Link } from "react-scroll";

// Designs
import "./scrolldown.scss";

const ScrollDown = () => {
  return (
    <Link to="" spy={true} smooth={true}>
      <div className="scrolldown no-select">
        <div className="field">
          <div className="mouse"></div>
        </div>
      </div>
    </Link>
  );
};

export default ScrollDown;
