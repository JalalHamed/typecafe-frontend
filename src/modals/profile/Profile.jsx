import React from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Close from "components/buttons/Close";
import Input from "components/inputs/Input";

// Functions
import { PriceFormat } from "components/helper";

// Actions
import { User } from "redux/actions";

// Designs
import "./profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.User);

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
          <i className="icon profile-pic-default" />
        </div>
        <div className="profile-content-left">
          <div>نام نمایشی</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
