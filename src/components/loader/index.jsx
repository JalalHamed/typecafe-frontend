// Libraries
import PuffLoader from "react-spinners/PuffLoader";
import SkewLoader from "react-spinners/SkewLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

export const Puffloader = ({ loading, color, size }) => {
  return (
    <PuffLoader color={color} loading={loading} css={override} size={size} />
  );
};

export const Skewloader = ({ loading, color, size }) => {
  return (
    <SkewLoader
      color={color}
      loading={loading}
      css={override}
      size={size}
      speedMultiplier={0.6}
    />
  );
};
