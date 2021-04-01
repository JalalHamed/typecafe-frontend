import React, { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";

// Actions
import { User, SelectedImage } from "redux/actions";

// Requests
import { ChangeProfileImage } from "requests";

// Designs
import "./profile.scss";

// xhr
import { baseURL } from "components/xhr";

const Profile = () => {
  const dispatch = useDispatch();
  const inputFileRef = useRef();
  const changePhotoRippleRef = useRef();
  const user = useSelector(state => state.User);
  const [errMsg, setErrMsg] = useState("");

  const handleChangePic = pic => {
    console.log(pic);
    if (pic.type.includes("image")) {
      setErrMsg("");
      ChangeProfileImage({ image: pic })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else {
      setErrMsg("فرمت فایل انتخابی اشتباه است.");
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
            accept="image/*"
          />
          {!!user.picture ? (
            <img
              src={baseURL + user.picture}
              alt="profile"
              className="profile-pic"
              onClick={() =>
                dispatch(
                  SelectedImage({
                    isModalOpen: true,
                    image: baseURL + user.picture,
                  })
                )
              }
            />
          ) : (
            <i
              className="icon profile-pic-default profile-pic"
              onClick={() => inputFileRef.current.click()}
            />
          )}
          <Button
            ref={changePhotoRippleRef}
            title="تغییر عکس پروفایل"
            className="fit-width"
            onClick={() => inputFileRef.current.click()}
          />
          <p className="err-msg">{errMsg}</p>
        </div>
        <div className="profile-content-left"></div>
      </div>
    </div>
  );
};

export default Profile;
