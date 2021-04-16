import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// hooks
import UseOnClickOutside from "hooks/UseOnClickOutside";

// Actions
import { User, CreateProject, Project } from "redux/actions";

// Designs
import "./userdropdown.scss";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const getProjects = useSelector(state => state.Project.getProjects);

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
    dispatch(Project({ getProjects: getProjects + 1 }));
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
