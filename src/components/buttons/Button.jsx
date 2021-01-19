import React, { forwardRef } from "react";

// Libraries
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

// Components
import TouchRipple from "components/ripple/TouchRipple";

// Designs
import "./buttons.scss";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Button = forwardRef(({ className, title, loading, onClick }, ref) => {
  return (
    <button
      className={`button ${className && className}`}
      disabled={loading}
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
      {loading ? (
        <PuffLoader color={"#fff"} loading={loading} css={override} size={25} />
      ) : (
        title
      )}
      <TouchRipple ref={ref} />
    </button>
  );
});

export default Button;
