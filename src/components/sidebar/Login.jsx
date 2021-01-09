import React, { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Actions
import { openLoginRegisterModal } from "redux/actions";

const Login = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector(state => state.isSideBarOpen);

  return (
    <div
      className={`sidebar-login ${
        isSideBarOpen ? "sidebar-login-wide" : "sidebar-login-short"
      } no-select`}
      onClick={() => dispatch(openLoginRegisterModal("login"))}
      onMouseDown={e => {
        ref.current.start(e);
      }}
      onMouseUp={() => {
        ref.current.stop();
      }}
      onMouseOut={() => {
        ref.current.stop();
      }}
    >
      <i
        className={`icon ${
          isSideBarOpen ? "icon-user-red-big" : "icon-user-red-regular"
        } icon-margin-18`}
      />
      <div
        className={
          isSideBarOpen ? "sidebar-login-text" : "sidebar-login-no-text"
        }
      >
        <p className="sidebar-login-title">وارد شوید</p>
        <p className="sidebar-login-description">
          برای دسترسی به همه امکانات سایت، به حساب کاربری خود وارد شوید.
        </p>
      </div>
      <TouchRipple ref={ref} />
    </div>
  );
});

export default Login;
