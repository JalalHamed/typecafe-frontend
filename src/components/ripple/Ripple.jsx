import { useState, useEffect } from "react";

// Libraries
import clsx from "clsx";

const Ripple = ({
  rippleX,
  rippleY,
  rippleSize,
  in: inProp, // Inejcted
  onExited = () => {},
  timeout,
}) => {
  const [leaving, setLeaving] = useState(false);

  const rippleClassName = clsx("ripple", "rippleVisible");

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = clsx("child", {
    childLeaving: leaving,
  });

  useEffect(() => {
    if (!inProp) {
      // Execute exit animation
      setLeaving(true);

      // Unmount
      const timeoutId = setTimeout(() => {
        onExited();
      }, timeout);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [onExited, inProp, timeout]);

  return (
    <span className={rippleClassName} style={rippleStyles}>
      <span className={childClassName} />
    </span>
  );
};

export default Ripple;
