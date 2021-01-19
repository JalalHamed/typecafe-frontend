import React from "react";

// Components
import Email from "./Email";
import Login from "./Login";

// Libraries
import { useSelector } from "react-redux";

// Designs
import "../loginregister.scss";

const RightSide = () => {
  const page = useSelector(state => state.LRModal.page);

  return (
    <>
      {page === "Email" && <Email />}
      {page === "Login" && <Login />}
    </>
  );
};

export default RightSide;
