import React from "react";

// Libraries
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

// Designs
import "./loading.scss";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loading = () => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="loading-wrapper"
    >
      <PuffLoader color={"#1c3987"} loading={true} css={override} size={100} />
      <p className="loading-note">لطفا صبر کنید...</p>
    </motion.div>
  );
};

export default Loading;
