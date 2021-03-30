import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Close from "components/buttons/Close";

// Actions
import { User } from "redux/actions";

// Designs
import "./profile.scss";

// xhr
import { baseURL } from "components/xhr";

const Profile = () => {
  const dispatch = useDispatch();
  const inputFileRef = useRef();
  const user = useSelector(state => state.User);

  const handleChangePic = pic => {
    console.log(pic);
    if (pic.type.includes("image")) {
      console.log("ok");
    } else {
      console.log("nah man");
    }
  };

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
          <input
            type="file"
            ref={inputFileRef}
            hidden
            onChange={e => handleChangePic(e.target.files[0])}
          />
          {!!user.picture ? (
            <img
              src={baseURL + user.picture}
              alt="profile"
              className="profile-pic"
              onClick={() => inputFileRef.current.click()}
            />
          ) : (
            <i
              className="icon profile-pic-default profile-pic"
              onClick={() => inputFileRef.current.click()}
            />
          )}
        </div>
        <div className="profile-content-left"></div>
      </div>
    </div>
  );
};

export default Profile;
