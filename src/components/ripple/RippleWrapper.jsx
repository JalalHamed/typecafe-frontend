import React, { forwardRef } from "react";

// components
import TouchRipple from "./TouchRipple";

const RippleWrapper = forwardRef(({ className, children, onClick }, ref) => {
  return (
    <div
      className={className}
      onClick={onClick}
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
      {children}
      <TouchRipple ref={ref} />
    </div>
  );
});

export default RippleWrapper;
