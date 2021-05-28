import React from "react";

const HintArrow = () => {
  return (
    <svg
      width="30"
      height="21"
      viewBox="0 0 30 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="hintArrowWrapper">
        <path
          id="hintArrowStem"
          d="M5 5C12.1494 14.8598 17.538 17.8765 29 20"
          stroke="black"
          strokeLinecap="round"
        />
        <path
          id="hintArrowCap"
          d="M1.40314 8C0.183396 0.540833 1.46142 -0.965235 9 3.52133"
          stroke="black"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default HintArrow;
