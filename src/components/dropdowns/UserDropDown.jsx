import React, { useRef } from "react";

// Libraries
import { useDispatch } from "react-redux";

// hooks
import UseOnClickOutside from "hooks/UseOnClickOutside";

// Actions
import { User, CreateProject } from "redux/actions";

// Designs
import "./userdropdown.scss";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  UseOnClickOutside(ref, () => dispatch(User({ isDropdownOpen: false })));

  const handleLogout = () => {
    localStorage.removeItem("ac_t");
    dispatch(
      User({
        isLoggedIn: false,
        isModalOpen: false,
        isDropdownOpen: false,
        displayname: "",
        email: "",
        credit: 0,
        image: "",
      })
    );
    dispatch(
      CreateProject({
        isModalOpen: false,
        firstMount: true,
        step: "uploadfile",
        file: "",
        languagesAndAdditions: [],
        numberOfPages: "",
        deliveryDeadline: "",
        description: "",
      })
    );
  };

  const handleProfile = () => {
    dispatch(User({ isDropdownOpen: false, isModalOpen: true }));
  };

  return (
    <div className="user-dropdown-wrapper" ref={ref}>
      <div className="user-dropdown-item" onClick={handleProfile}>
        پروفایل
      </div>
      <div className="user-dropdown-item" onClick={handleLogout}>
        خروج
      </div>
    </div>
  );
};

export default UserDropDown;
