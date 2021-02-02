import React, { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import RippleWrapper from "components/ripple/RippleWrapper";

// Actions
import { Sidebar } from "redux/actions";

const Item = forwardRef(({ status, title }, ref) => {
  const page = useSelector(state => state.Sidebar.page);
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (page !== status) {
      dispatch(Sidebar({ page: status }));
    }
  };

  return (
    <RippleWrapper
      className={`sidebar-items_item${page === status ? "_selected" : ""}`}
      onClick={handleClick}
      ref={ref}
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
    </RippleWrapper>
  );
});

export default Item;
