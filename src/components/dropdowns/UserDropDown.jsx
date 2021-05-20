import React from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Requests
import { UserDisconnect } from "requests";

// Actions
import { User, Profile } from "redux/actions";

// Designs
import "./dropdowns.scss";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);

  const handleLogout = () => {
    UserDisconnect()
      .then(() => {
        sessionStorage.clear();
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleProfile = () => {
    dispatch(User({ isDropdownOpen: false }));
    dispatch(
      Profile({
        isModalOpen: true,
        id: user.id,
      })
    );
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
