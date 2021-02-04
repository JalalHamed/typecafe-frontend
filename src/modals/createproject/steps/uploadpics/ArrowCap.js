import React, { useEffect, useRef } from "react";

const ArrowCap = () => {
  const path = useRef();

  useEffect(() => {
    console.log("path length", path.current.getTotalLength());
  }, []);
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={path}
        id="arrowCap"
        d="M1 2.5L9 1.5L6.5 9"
        stroke="#29313B"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowCap;
