import React from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Components
import Close from "components/buttons/Close";
import SelfProfile from "./SelfProfile";
import OthersProfile from "./OthersProfile";

// Actions
import { Profile } from "redux/actions";

// Designs
import "./profile.scss";

const TheProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Profile);
  const _self = useSelector(state => state.User);

  return (
    <motion.div
      className={`profile-wrapper ${_self.id === user.id ? "wider" : ""}`}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
    >
      <div className="profile-header">
        <p className="profile-header-title">پروفایل</p>
        <Close
          className="close-modal"
          onClick={() =>
            dispatch(
              Profile({
                isModalOpen: false,
                isLoading: true,
                id: null,
                displayname: "",
                image: "",
                successfulProjects: 0,
                unsuccessfulProjects: 0,
                ontimeDelivery: 0,
                email: "",
                credit: 0,
              })
            )
          }
        />
      </div>
      {_self.id === user.id ? <SelfProfile /> : <OthersProfile />}
    </motion.div>
  );
};

export default TheProfile;
