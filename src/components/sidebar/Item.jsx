import React, { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Actions
import { Sidebar, User } from "redux/actions";

const Item = forwardRef(({ status, title }, ref) => {
  const page = useSelector(state => state.Sidebar.page);
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);
  const isLogoutModalOpen = useSelector(state => state.User.isLogoutModalOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (status === "logout") {
      if (!isLogoutModalOpen) dispatch(User({ isLogoutModalOpen: true }));
    } else if (page !== status) {
      dispatch(Sidebar({ page: status }));
    }
  };

  return (
    <div
      className={`sidebar-items_item${page === status ? "_selected" : ""}`}
      onClick={handleClick}
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
        className={`icon icon-margin-24 ${
          page === status ? `icon-${status}-black` : `icon-${status}-white`
        }`}
      />
      <div
        className={
          isSidebarOpen ? "sidebar-item-title" : "sidebar-item-no-title"
        }
      >
        {title}
      </div>
      <TouchRipple ref={ref} />
    </div>
  );
});

export default Item;
