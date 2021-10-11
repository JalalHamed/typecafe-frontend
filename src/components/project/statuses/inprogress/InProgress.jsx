import { useState, useEffect, useRef } from "react";

// Components
import UploadTypedFile from "./UploadTypedFile";
import WaitingForTypedFile from "./WaitingForTypedFile";
import { remainingTime, farsiNumber } from "components/helper";
import { Skewloader } from "components/loader";

const InProgress = ({ project, offer, myoffer }) => {
  const hours = useRef(0);
  const minutes = useRef(0);
  const seconds = useRef(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [deadline, setDeadline] = useState(null);

  useEffect(() => {
    if (myoffer)
      setDeadline(
        remainingTime(myoffer.typist_ready, project.delivery_deadline * 60 * 60)
      );
    if (offer)
      setTimeout(() => {
        setDeadline(
          remainingTime(offer.typist_ready, project.delivery_deadline * 60 * 60)
        );
      }, 0);
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
        if (myoffer)
          setDeadline(
            remainingTime(
              myoffer.typist_ready,
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
  }, [deadline, myoffer, offer, project]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };

    // eslint-disable-next-line
  }, [width]);

  return (
    <>
      {offer || myoffer ? (
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
          {myoffer && <UploadTypedFile project={project} />}
          {offer && <WaitingForTypedFile offer={offer} />}
        </div>
      ) : (
        <Skewloader color="#fca636" />
      )}
    </>
  );
};

export default InProgress;
