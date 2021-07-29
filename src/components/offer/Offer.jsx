import React, { useState, useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { toast } from "react-toastify";

// Components
import { priceFormat, remainingTime, farsiNumber } from "components/helper";

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

  const openProfile = () => {
    dispatch(
      Profile({
        isModalOpen: true,
        id: offer.typist_id,
        displayname: offer.typist,
        image: offer.typist_image,
      })
    );
  };

  const openAoRModal = status => {
    dispatch(
      AoROfferAction({
        isModalOpen: true,
        id: offer.id,
        project_id: project.id,
        typist: offer.typist,
        typist_id: offer.typist_id,
        typistImage: offer.typist_image,
        myOfferPrice: offer.myOffer_price,
        totalPrice: offer.total_price,
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
          clearInterval(interval);
          dispatch(
            ClientAccept({
              client: "",
              project: null,
              issued_at: null,
              offer: null,
            })
          );
          if (user.id === project.client_id)
            toast.info("تایپیست مورد نظر در اعلام آمادگی خود ناموفق بود.");
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line
  }, [deadline]);

  return (
    <>
      {!!offer && (
        <div
          key={offer.id}
          className={`offer ${offer.status === "REJ" ? "rejected" : ""}`}
        >
          {offer.typist_id !== user.id && (
            <div className="typist-wrapper">
              {offer.typist_image ? (
                <img
                  src={baseURL + offer.typist_image}
                  alt="typist_image"
                  className="typist-image pointer"
                  onClick={openProfile}
                />
              ) : (
                <i
                  className="icon offer-typist-default-pic pointer"
                  onClick={openProfile}
                />
              )}
              <span
                className="typist-displayname pointer"
                onClick={openProfile}
              >
                {offer.typist}
              </span>
            </div>
          )}
          <div className="myoffer-price-wrapper">
            <span className="myoffer-price-title">قیمت پیشنهادی</span>
            <span className="myoffer-price">
              {priceFormat(offer.offer_price)}
            </span>
          </div>
          <div className="myoffer-price-wrapper">
            <span className="myoffer-price-title">جمع کل</span>
            <span className="myoffer-price">
              {priceFormat(offer.total_price)}
            </span>
          </div>
          {!countdown ? (
            <>
              {project.client_id === user.id ? (
                <div className="accept-reject-wrapper no-select">
                  <div
                    className="accept"
                    onClick={() => openAoRModal("accept")}
                  >
                    <i className="icon icon-check-green" />
                  </div>
                  <div
                    className="reject"
                    onClick={() => openAoRModal("reject")}
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
      )}
    </>
  );
};

export default Offer;
