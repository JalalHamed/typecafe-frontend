import React, { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Actions
import { changePage } from "redux/actions";

const Item = forwardRef(({ status, title }, ref) => {
  const page = useSelector(state => state.page);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (page !== status) {
      dispatch(changePage(status));
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
        className={`icon ${
          page === status ? `icon-${status}-black` : `icon-${status}-white`
        }`}
      />
      {title}
      <TouchRipple ref={ref} />
    </div>
  );
});

export default Item;
