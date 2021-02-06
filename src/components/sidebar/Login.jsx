import React, { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import RippleWrapper from "components/ripple/RippleWrapper";

// Actions
import { LR } from "redux/actions";

const Login = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);

  return (
    <RippleWrapper
      className={`user-profile login ${
        isSidebarOpen ? "sidebar-profile-wide" : "sidebar-profile-short"
      } no-select`}
      onClick={() => dispatch(LR({ isModalOpen: true }))}
      ref={ref}
    >
      <i
        className={`icon ${
          isSidebarOpen ? "icon-user-red-big" : "icon-user-red-regular"
        } icon-margin-18`}
      />
      <div
        className={
          isSidebarOpen ? "sidebar-profile-text" : "sidebar-profile-no-text"
        }
      >
        <p className="sidebar-profile-title">وارد شوید</p>
        <p className="sidebar-profile-description">
          برای دسترسی به همه امکانات سایت، به حساب کاربری خود وارد شوید.
        </p>
      </div>
    </RippleWrapper>
  );
});

export default Login;
