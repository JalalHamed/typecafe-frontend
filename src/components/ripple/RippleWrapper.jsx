import { forwardRef } from "react";

// components
import TouchRipple from "./TouchRipple";

const RippleWrapper = forwardRef(
  ({ className, children, onClick, parentRef }, ref) => {
    return (
      <div
        ref={parentRef}
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
  }
);

export default RippleWrapper;
