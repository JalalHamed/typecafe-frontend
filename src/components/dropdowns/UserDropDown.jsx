import React, { useRef } from "react";

// Libraries
import { useDispatch } from "react-redux";

// hooks
import UseOnClickOutside from "hooks/UseOnClickOutside";

// Actions
import { User } from "redux/actions";

// Designs
import "./userdropdown.scss";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  UseOnClickOutside(ref, () => dispatch(User({ isDropdownOpen: false })));

  return (
    <div className="user-dropdown-wrapper" ref={ref}>
      <div className="user-dropdown-item">تنظیمات</div>
      <div
        className="user-dropdown-item"
        onClick={() =>
          dispatch(User({ isLoggedIn: false, isDropdownOpen: false }))
        }
      >
        خروج
      </div>
    </div>
  );
};

export default UserDropDown;