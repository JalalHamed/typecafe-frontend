import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Requests
import { UserDisconnect } from "requests";

// Actions
import { User } from "redux/actions";

// Designs
import "./dropdowns.scss";

const UserDropDown = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    UserDisconnect()
      .then(() => {
        localStorage.removeItem("ac_t");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleProfile = () => {
    dispatch(User({ isDropdownOpen: false, isModalOpen: true }));
  };

  return (
    <div className="user-dropdown-wrapper no-select">
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
