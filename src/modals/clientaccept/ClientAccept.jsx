import React, { useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import Button from "components/buttons/Button";
import { farsiNumber } from "components/helper";

// Design
import "./clientaccept.scss";

const TheClientAccept = () => {
  const submitRef = useRef();
  const data = useSelector(state => state.ClientAccept);

  return (
    <div className="client-accept-wrapper">
      <p className="ct-note">
        <span className="ct-emphasize">{data.client}</span> پیشنهاد شما برای
        پروژه با شناسه{" "}
        <span className="ct-emphasize">{farsiNumber(data.project)}</span> را
        تایید کرد.
      </p>
      <p className="ct-are-you-ready">آماده‌اید شروع کنید؟</p>
      <Button title="آماده‌ام" ref={submitRef} />
    </div>
  );
};

export default TheClientAccept;
