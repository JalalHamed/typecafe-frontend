import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";
import { priceFormat } from "components/helper";

// Requests
import {
  ChangeProfileImage,
  ChangeDisplayName,
  DeleteProfileImage,
  handleErrors,
} from "requests";

// Actions
import { Profile, SelectedImage, Sidebar, User } from "redux/actions";

// xhr
import { baseURL } from "components/xhr";

const SelfProfile = () => {
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
      let body = new FormData();
      body.append("image", pic);
      ChangeProfileImage(body)
        .then(res => {
          dispatch(Profile({ image: res.image }));
          dispatch(User({ image: res.image }));
          toast.success("عکس پروفایل با موفقیت بروزرسانی شد.");
        })
        .catch(err => handleErrors(err, setErrMsg));
    } else {
      setErrMsg("فرمت فایل انتخاب شده صحیح نمی‌باشد.");
    }
  };

  const handleEditDisplayname = () => {
    if (editMode === false) {
      setEditMode(true);
    } else {
      if (displayName !== user.displayname) {
        ChangeDisplayName({ displayname: displayName })
          .then(res => {
            dispatch(Profile({ displayname: res.displayname }));
            setDisplayNameErrMsg("");
            toast.success("نام نمایشی با موفیت بروزرسانی شد.");
          })
          .catch(err => {
            setDisplayName(user.displayname);
            handleErrors(err, setDisplayNameErrMsg);
          });
      }
      setEditMode(false);
    }
  };

  const handleCredit = () => {
    dispatch(Profile({ isModalOpen: false }));
    dispatch(Sidebar({ page: "financials" }));
  };

  const handleDeletePhoto = () => {
    DeleteProfileImage()
      .then(() => {
        dispatch(Profile({ image: "" }));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    dispatch(
      Profile({
        isLoading: false,
        id: user.id,
        displayname: user.displayname,
        image: user.image,
        successfulProjects: user.successfulProjects,
        unsuccessfulProjects: user.unsuccessfulProjects,
        ontimeDelivery: user.ontimeDelivery,
        // if self
        email: user.email,
        credit: user.credit,
      })
    );

    // eslint-disable-next-line
  }, []);

  return (
    <div className="profile-content">
      <div className="profile-content-right">
        <input
          type="file"
          ref={inputFileRef}
          onChange={e => handleChangePic(e.target.files[0])}
          onClick={e => {
            e.target.value = null; // allows uploading the same file over and over
          }}
          encType="multipart/form-data"
          accept="image/*"
          hidden
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
        {user.image && (
          <div className="delete-photo tooltip" onClick={handleDeletePhoto}>
            <span className="tooltiptext">حذف عکس</span>
            <i className="icon icon-close-background-red" />
          </div>
        )}
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
        <p className="value">{priceFormat(user.credit)}</p>
        <p className="displayname-err-msg">{displayNameErrMsg}</p>
      </div>
    </div>
  );
};

export default SelfProfile;
