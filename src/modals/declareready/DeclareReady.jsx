import { useRef, useEffect, useState } from "react";

// Libraries
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Components
import Button from "components/buttons/Button";
import { farsiNumber, priceFormat, remainingTime } from "components/helper";

// Requests
import socket from "requests/socket";
import { TypistDeclareReady, handleErrors } from "requests";

// Actions
import {
  ClientAccept,
  Sounds,
  User,
  AddmyOfferTypistReadyTime,
  ChangemyOfferStatus,
  RemoveAllOtherTypistsmyOffers,
} from "redux/actions";

// Design
import "./declareready.scss";

const TheClientAccept = () => {
  const dispatch = useDispatch();
  const submitRef = useRef();
  const user = useSelector(state => state.User);
  const data = useSelector(state => state.ClientAccept);
  const sounds = useSelector(state => state.Sounds);
  const myOffers = useSelector(state => state.Offers.myOffers);
  const [deadline, setDeadline] = useState(remainingTime(data.issued_at, 30));

  const handleSubmit = () => {
    TypistDeclareReady({ id: data.offer })
      .then(res => {
        socket.send(
          JSON.stringify({
            status: "project-in-progress",
            project: data.project,
            typist: user.id,
            typist_ready: res,
            total_price: data.total_price,
            offer: data.offer,
          })
        );
        dispatch(
          AddmyOfferTypistReadyTime({
            project: data.project,
            typist_ready: res,
          })
        );
        dispatch(ChangemyOfferStatus({ id: data.offer, status: "ACC" }));
        dispatch(User({ credit: user.credit - data.total_price }));
        if (myOffers.find(offer => offer.project !== data.project))
          dispatch(RemoveAllOtherTypistsmyOffers({ project: data.project }));
        if (user.playSounds)
          dispatch(Sounds({ typistAccept: sounds.typistAccept + 1 }));
        dispatch(
          ClientAccept({
            isModalOpen: false,
            project: null,
            issued_at: null,
            client: "",
            offer: null,
            total_price: null,
          })
        );
        toast.info(
          <>
            <span className="f-14">برداشت از اعتبار</span>
            <br />
            <span className="f-14">مبلغ:</span> {priceFormat(data.total_price)}
          </>
        );
        setTimeout(() => {
          toast.success(
            <>
              پروژه {farsiNumber(data.project)} با موفقیت به شما سپرده شد. شروع
              کنید.
            </>
          );
        }, 1000);
      })
      .catch(err => handleErrors(err));
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (deadline > 0) {
        setDeadline(remainingTime(data.issued_at, 30));
      } else {
        if (user.playSounds)
          dispatch(
            Sounds({ typistFailedToAccept: sounds.typistFailedToAccept + 1 })
          );
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
      className="declare-ready-wrapper"
    >
      <p className="dr-note">
        <span className="dr-emphasize">{data.client}</span> پیشنهاد شما برای
        پروژه با شناسه{" "}
        <span className="dr-emphasize">{farsiNumber(data.project)}</span> را
        تایید کرد.
      </p>
      <p className="dr-are-you-ready">آماده‌اید شروع کنید؟</p>
      <Button
        ref={submitRef}
        title="آماده‌ام"
        className="w-49 dr-ready-button green"
        onClick={handleSubmit}
      />
      <div className="dr-countdown">{farsiNumber(deadline)}</div>
    </motion.div>
  );
};

export default TheClientAccept;
