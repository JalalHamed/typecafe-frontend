import React, { forwardRef } from "react";

// components
import TouchRipple from "components/ripple/TouchRipple";

const SubmitButton = forwardRef(({ className, title }, ref) => {
  return (
    <button
      className={className && className}
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
      {title}
      <TouchRipple ref={ref} />
    </button>
  );
});

export default SubmitButton;
