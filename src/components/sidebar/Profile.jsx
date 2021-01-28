import React, { forwardRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

const Profile = forwardRef((props, ref) => {
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);
  const user = useSelector(state => state.User);

  return (
    <div
      className={`user-profile ${
        isSidebarOpen ? "sidebar-profile-wide" : "sidebar-profile-short"
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
          isSidebarOpen ? "icon-user-default-big" : "icon-user-default-regular"
        } icon-margin-18`}
      />
      <div
        className={
          isSidebarOpen ? "sidebar-profile-text" : "sidebar-profile-no-text"
        }
      >
        {user.displayname}
      </div>
      <TouchRipple ref={ref} />
    </div>
  );
});

export default Profile;
