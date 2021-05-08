import React from "react";

// Libraries
import { motion } from "framer-motion";

// Componenets
import { Puffloader } from "components/loader";

// Designs
import "./loading.scss";

const Loading = () => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="loading-wrapper"
    >
      <Puffloader color="#1c3987" loading={true} size={100} />
      <p className="loading-note">لطفا صبر کنید...</p>
    </motion.div>
  );
};

export default Loading;
