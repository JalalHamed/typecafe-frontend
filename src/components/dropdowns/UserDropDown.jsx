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
    dispatch(User({ isDropdownOpen: false, isLoggedIn: false }));
    dispatch(
      CreateProject({
        description: "",
        numberOfPages: "",
        deliveryDeadline: "",
        languages: [],
        file: "",
        step: "uploadfile",
      })
    );
  };

  return (
    <div className="user-dropdown-wrapper" ref={ref}>
      <div className="user-dropdown-item">تنظیمات</div>
      <div className="user-dropdown-item" onClick={handleLogout}>
        خروج
      </div>
    </div>
  );
};

export default UserDropDown;
