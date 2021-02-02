import React, { forwardRef } from "react";

// Components
import TouchRipple from "components/ripple/TouchRipple";

const Previous = forwardRef(({ className, onClick }, ref) => {
  return (
    <button
      className={`back-button ${className && className}`}
      onClick={onClick}
      type="button"
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
      بازگشت
      <TouchRipple ref={ref} />
    </button>
  );
});

export default Previous;
