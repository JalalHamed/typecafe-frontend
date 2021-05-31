import React, { useRef, useEffect, useState } from "react";

// Libraries
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Components
import Button from "components/buttons/Button";
import { farsiNumber, period } from "components/helper";

// Actions
import { ClientAccept } from "redux/actions";

// Design
import "./clientaccept.scss";

const TheClientAccept = () => {
  const dispatch = useDispatch();
  const submitRef = useRef();
  const data = useSelector(state => state.ClientAccept);
  const [deadline, setDeadline] = useState(
    period(data.issued_at, 30, "seconds")
  );

  const handleSubmit = () => {
    dispatch(
      ClientAccept({
        isModalOpen: false,
        project: null,
        issued_at: null,
        client: "",
      })
    );
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (deadline !== 0) {
        setDeadline(deadline - 1);
      } else {
        dispatch(
          ClientAccept({
            isModalOpen: false,
            project: null,
            issued_at: null,
            client: "",
          })
        );
        toast.error(
          `پیشنهاد شما برای انجام پروژه با شناسه ${farsiNumber(
            data.project
          )} تایید شد اما شما در اعلام آمادگی خود برای شروع کار ناموفق بودید.`
        );
      }
    }, 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line
  }, [deadline]);

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="client-accept-wrapper"
    >
      <p className="ca-note">
        <span className="ca-emphasize">{data.client}</span> پیشنهاد شما برای
        پروژه با شناسه{" "}
        <span className="ca-emphasize">{farsiNumber(data.project)}</span> را
        تایید کرد.
      </p>
      <p className="ca-are-you-ready">آماده‌اید شروع کنید؟</p>
      <Button
        ref={submitRef}
        title="آماده‌ام"
        className="w-49 ca-ready-button green"
        onClick={handleSubmit}
      />
      <div className="ca-countdown">{farsiNumber(deadline)}</div>
    </motion.div>
  );
};

export default TheClientAccept;
