import React, { forwardRef } from "react";

// Libraries
import { TransitionGroup } from "react-transition-group";

// Components
import Ripple from "./Ripple";

// Designs
import "./ripple.scss";

const DURATION = 500;

const TouchRipple = forwardRef(function TouchRipple(
  { center: centerProp, classes },
  ref
) {
  // Record ripples, used to start animation and end animation
  const [ripples, setRipples] = React.useState([]);
  const nextKey = React.useRef(0);
  const container = React.useRef(null);

  const startCommit = React.useCallback(
    params => {
      const { rippleX, rippleY, rippleSize } = params;
      // Add ripple and start animation
      setRipples(oldRipples => [
        ...oldRipples,
        <Ripple
          key={nextKey.current}
          classes={classes}
          timeout={DURATION}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]);
      nextKey.current += 1;
    },
    [classes]
  );

  const start = React.useCallback(
    (event = {}, options = {}) => {
      // The default is centerProp
      const { center = centerProp } = options;
      const element = container.current;
      const rect = element
        ? element.getBoundingClientRect()
        : {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          };

      let rippleX;
      let rippleY;
      let rippleSize;

      if (
        center ||
        (event.clientX === 0 && event.clientY === 0) ||
        (!event.clientX && !event.touches)
      ) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        const clientX = event.clientX
          ? event.clientX
          : event.touches[0].clientX;
        const clientY = event.clientY
          ? event.clientY
          : event.touches[0].clientY;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }

      if (center) {
        rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      } else {
        const sizeX =
          Math.max(
            Math.abs((element ? element.clientWidth : 0) - rippleX),
            rippleX
          ) *
            2 +
          2;
        const sizeY =
          Math.max(
            Math.abs((element ? element.clientHeight : 0) - rippleY),
            rippleY
          ) *
            2 +
          2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
      }

      startCommit({ rippleX, rippleY, rippleSize });
    },
    [startCommit, centerProp]
  );

  const stop = React.useCallback(() => {
    setRipples(oldRipples => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
  }, []);

  // Expose the start stop
  React.useImperativeHandle(
    ref,
    () => ({
      start,
      stop,
    }),
    [start, stop]
  );

  return (
    <span ref={container} className={"touchRippleRoot"}>
      <TransitionGroup component={null} exit>
        {ripples}
      </TransitionGroup>
    </span>
  );
});

export default TouchRipple;
