import React, { useRef } from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import Button from "components/buttons/Button";
import BackButton from "components/buttons/BackButton";

// Actions
import { User, Sidebar } from "redux/actions";

// Designs
import "./logout.scss";

const Logout = () => {
  const dispatch = useDispatch();
  const LogoutRippleRef = useRef();
  const CancelRippleRef = useRef();

  return (
    <div className="logout-modal-wrapper">
      <div
        className="close-modal no-select"
        onClick={() => dispatch(User({ isLogoutModalOpen: false }))}
      >
        x
      </div>
      <p className="logout-modal-title">آیا از خروج خود مطمئن هستید؟</p>
      <div className="button-wrapper">
        <Button
          title="خروج"
          ref={LogoutRippleRef}
          className="logout-button w-49"
          onClick={() => {
            dispatch(Sidebar({ page: "projects" }));
            dispatch(User({ isLoggedIn: false, isLogoutModalOpen: false }));
          }}
        />
        <BackButton
          title="انصراف"
          ref={CancelRippleRef}
          className="w-49"
          onClick={() => dispatch(User({ isLogoutModalOpen: false }))}
        />
      </div>
    </div>
  );
};

export default Logout;
