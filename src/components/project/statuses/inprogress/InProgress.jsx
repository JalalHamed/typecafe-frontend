import React, { useState, useEffect, useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import UploadTypedFile from "./UploadTypedFile";
import WaitingForTypedFile from "./WaitingForTypedFile";
import { remainingTime, farsiNumber } from "components/helper";
import { Skewloader } from "components/loader";

const InProgress = ({ project }) => {
  const hours = useRef(0);
  const minutes = useRef(0);
  const seconds = useRef(0);
  const user = useSelector(state => state.User);
  const offereds = useSelector(state => state.Offers.offereds);
  const offers = useSelector(state => state.Offers.offers);
  const offered = offereds.find(x => x.project === project.id);
  const offer = offers.find(x => x.project === project.id);
  const [width, setWidth] = useState(window.innerWidth);
  const [deadline, setDeadline] = useState(null);

  useEffect(() => {
    if (offered)
      setDeadline(
        remainingTime(
          offered?.typist_ready,
          project.delivery_deadline * 60 * 60
        )
      );
    if (user.id === project.client_id)
      setDeadline(
        remainingTime(offer?.typist_ready, project.delivery_deadline * 60 * 60)
      );
    if (deadline && deadline > 0) {
      hours.current = parseInt(deadline / 3600);
      minutes.current = parseInt(
        (deadline - parseInt(deadline / 3600) * 3600) / 60
      );
      seconds.current =
        deadline -
        parseInt((deadline - parseInt(deadline / 3600) * 3600) / 60) * 60 -
        parseInt(deadline / 3600) * 3600;
    }
    let interval = setInterval(() => {
      if (deadline > 0) {
        if (offered)
          setDeadline(
            remainingTime(
              offered.typist_ready,
              project.delivery_deadline * 60 * 60
            )
          );
        if (offer)
          setDeadline(
            remainingTime(
              offer.typist_ready,
              project.delivery_deadline * 60 * 60
            )
          );
        hours.current = parseInt(deadline / 3600);
        minutes.current = parseInt(
          (deadline - parseInt(deadline / 3600) * 3600) / 60
        );
        seconds.current =
          deadline -
          parseInt((deadline - parseInt(deadline / 3600) * 3600) / 60) * 60 -
          parseInt(deadline / 3600) * 3600;
      } else {
        clearInterval(interval);
      }
    }, 0);

    return () => clearInterval(interval);

    // eslint-disable-next-line
  }, [deadline, offered, offer, project]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };

    // eslint-disable-next-line
  }, [width]);

  return (
    <>
      {user.id === project.client_id || offered ? (
        <div className="in-progress-wrapper">
          <div
            className={`time-left-wrapper  ${width < 1500 ? "less-right" : ""}`}
          >
            {!!hours.current && (
              <>
                <p className="time-digit">{farsiNumber(hours.current)}</p>
                <p className="time-title">ساعت</p>
              </>
            )}
            {!!minutes.current && (
              <>
                <p className="time-digit">{farsiNumber(minutes.current)}</p>
                <p className="time-title">دقیقه</p>
              </>
            )}
            {!!seconds.current && (
              <>
                <p className="time-digit">{farsiNumber(seconds.current)}</p>
                <p className="time-title">ثانیه</p>
              </>
            )}
          </div>
          {offered && <UploadTypedFile />}
          {user.id === project.client_id && offer && (
            <WaitingForTypedFile offer={offer} />
          )}
        </div>
      ) : (
        <Skewloader color="#fca636" />
      )}
    </>
  );
};

export default InProgress;
