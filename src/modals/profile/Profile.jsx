import React, { useRef } from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import Close from "components/buttons/Close";

// Actions
import { User } from "redux/actions";

// Designs
import "./profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const inputFileRef = useRef();

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <p className="profile-header-title">پروفایل</p>
        <Close
          className="close-modal"
          onClick={() => dispatch(User({ isModalOpen: false }))}
        />
      </div>
      <div className="profile-content">
        <div className="profile-content-right">
          <i
            className="icon profile-pic-default profile-pic"
            onClick={() => inputFileRef.current.click()}
          />
          <input type="file" ref={inputFileRef} hidden />
        </div>
        <div className="profile-content-left"></div>
      </div>
    </div>
  );
};

export default Profile;
