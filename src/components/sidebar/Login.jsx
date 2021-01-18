import React, { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Actions
import { openLrModal } from "redux/actions";

const Login = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector(state => state.isSideBarOpen);

  return (
    <div
      className={`user-profile ${
        isSideBarOpen ? "sidebar-profile-wide" : "sidebar-profile-short"
      } no-select`}
      onClick={() => dispatch(openLrModal())}
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
          isSideBarOpen ? "sidebar-profile-text" : "sidebar-profile-no-text"
        }
      >
        <p className="sidebar-profile-title">وارد شوید</p>
        <p className="sidebar-profile-description">
          برای دسترسی به همه امکانات سایت، به حساب کاربری خود وارد شوید.
        </p>
      </div>
      <TouchRipple ref={ref} />
    </div>
  );
});

export default Login;
