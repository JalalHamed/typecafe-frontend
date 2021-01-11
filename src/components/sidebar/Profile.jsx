import React, { forwardRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

const Profile = forwardRef((props, ref) => {
  const isSideBarOpen = useSelector(state => state.isSideBarOpen);

  return (
    <div
      className={`user-profile ${
        isSideBarOpen ? "sidebar-profile-wide" : "sidebar-profile-short"
      } no-select`}
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
          isSideBarOpen ? "icon-user-default-big" : "icon-user-default-regular"
        } icon-margin-18`}
      />
      <div
        className={
          isSideBarOpen ? "sidebar-profile-text" : "sidebar-profile-no-text"
        }
      >
        نام کاربری
      </div>
      <TouchRipple ref={ref} />
    </div>
  );
});

export default Profile;
