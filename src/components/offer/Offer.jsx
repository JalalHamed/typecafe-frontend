import React, { useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { toast } from "react-toastify";

// Components
import {
  priceFormat,
  addCommission,
  remainingTime,
  farsiNumber,
} from "components/helper";

// Actions
import { AoROfferAction, Profile, ClientAccept } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Design
import "./offer.scss";

const Offer = ({ offer, project, countdown }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);
  const ClientAcceptState = useSelector(state => state.ClientAccept);
  const [deadline, setDeadline] = useState(
    remainingTime(ClientAcceptState.issued_at, 30)
  );

  const openProfile = offer => {
    dispatch(
      Profile({
        isModalOpen: true,
        id: offer.typist_id,
        displayname: offer.typist,
        image: offer.typist_image,
      })
    );
  };

  const openAoRModal = (offer, status) => {
    dispatch(
      AoROfferAction({
        isModalOpen: true,
        id: offer.id,
        project_id: project.id,
        typist: offer.typist,
        typistImage: offer.typist_image,
        offeredPrice: offer.offered_price,
        wholePrice: addCommission(
          offer.offered_price * project.number_of_pages
        ),
        status: status,
      })
    );
  };

  useEffect(() => {
    if (ClientAcceptState.issued_at) {
      let interval = setInterval(() => {
        if (deadline > 0) {
          setDeadline(remainingTime(ClientAcceptState.issued_at, 30));
        } else {
          dispatch(
            ClientAccept({
              client: "",
              project: null,
              issued_at: null,
              offer: null,
            })
          );
          toast.info("تایپیست مورد نظر در اعلام آمادگی خود ناموفق بود.");
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line
  }, [deadline]);

  return (
    <div key={offer.id} className="offer">
      {offer.typist_id !== user.id && (
        <div className="typist-wrapper">
          {offer.typist_image ? (
            <img
              src={baseURL + offer.typist_image}
              alt="typist_image"
              className="typist-image pointer"
              onClick={() => openProfile(offer)}
            />
          ) : (
            <i
              className="icon offer-typist-default-pic pointer"
              onClick={() => openProfile(offer)}
            />
          )}
          <span
            className="typist-displayname pointer"
            onClick={() => openProfile(offer)}
          >
            {offer.typist}
          </span>
        </div>
      )}
      <div className="offered-price-wrapper">
        <span className="offered-price-title">قیمت پیشنهادی</span>
        <span className="offered-price">
          {priceFormat(offer.offered_price)}
        </span>
      </div>
      <div className="offered-price-wrapper">
        <span className="offered-price-title">جمع کل</span>
        <span className="offered-price">
          {priceFormat(
            addCommission(offer.offered_price * project.number_of_pages)
          )}
        </span>
      </div>
      {!countdown ? (
        <>
          {project.client_id === user.id ? (
            <div className="accept-reject-wrapper no-select">
              <div
                className="accept"
                onClick={() => openAoRModal(offer, "accept")}
              >
                <i className="icon icon-check-green" />
              </div>
              <div
                className="reject"
                onClick={() => openAoRModal(offer, "reject")}
              >
                <i className="icon icon-close-red" />
              </div>
            </div>
          ) : (
            <p className="waiting-for-approval">
              {offer.status === "A" && <span>در انتظار تایید</span>}
              {offer.status === "REJ" && (
                <span className="rejected-note">رد شده</span>
              )}
            </p>
          )}
        </>
      ) : (
        <p className="deadline">{farsiNumber(deadline)}</p>
      )}
      <div className="offer-created-at">
        <Moment fromNow locale="fa">
          {offer.created_at}
        </Moment>
      </div>
    </div>
  );
};

export default Offer;
