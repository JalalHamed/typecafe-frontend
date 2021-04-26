import React from "react";

// Libraries
import { useDispatch } from "react-redux";

// Actions
import { User, CreateProject } from "redux/actions";

// Designs
import "./dropdowns.scss";

const UserDropDown = () => {
  const dispatch = useDispatch();

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
