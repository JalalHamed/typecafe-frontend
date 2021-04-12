import React, { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";
import { PriceFormat } from "components/helper";

// Actions
import { User, SelectedImage, Sidebar } from "redux/actions";

// Requests
import { ChangeProfileImage, ChangeDisplayName, handleErrors } from "requests";

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
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayname);
  const [displayNameErrMsg, setDisplayNameErrMsg] = useState("");

  const handleChangePic = pic => {
    if (pic.type.includes("image")) {
      setErrMsg("");
      console.log(pic);
      ChangeProfileImage({ image: pic })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else {
      setErrMsg("فرمت فایل انتخابی اشتباه است.");
    }
  };

  const handleEditDisplayname = () => {
    if (editMode === false) {
      setEditMode(true);
    } else {
      ChangeDisplayName({ displayname: displayName })
        .then(res => {
          dispatch(User({ displayname: res.displayname }));
          setDisplayNameErrMsg("");
          toast.success("نام نمایشی با موفیت بروزرسانی شد.");
        })
        .catch(err => {
          setDisplayName(user.displayname);
          handleErrors(err, setDisplayNameErrMsg);
        });
      setEditMode(false);
    }
  };

  const handleCredit = () => {
    dispatch(User({ isModalOpen: false }));
    dispatch(Sidebar({ page: "financials" }));
  };

  return (
    <motion.div
      className="profile-wrapper"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
    >
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
            enctype="multipart/form-data"
          />
          {!!user.image ? (
            <img
              src={baseURL + user.image}
              alt="profile"
              className="profile-pic"
              onClick={() =>
                dispatch(
                  SelectedImage({
                    isModalOpen: true,
                    image: baseURL + user.image,
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
        <div className="profile-content-left">
          <p className="title">
            نام نمایشی{" "}
            <span className="edit no-select" onClick={handleEditDisplayname}>
              {!editMode ? "ویرایش" : "ثبت"}
            </span>
          </p>
          {!editMode ? (
            <p className="value">{displayName}</p>
          ) : (
            <Input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              autoFocus
            />
          )}
          <p className="title">ایمیل</p>
          <p className="value">{user.email}</p>
          <p className="title">
            اعتبار{" "}
            <span className="edit no-select" onClick={handleCredit}>
              افزایش/برداشت
            </span>
          </p>
          <p className="value">{PriceFormat(user.credit)}</p>
          <p className="displayname-err-msg">{displayNameErrMsg}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
