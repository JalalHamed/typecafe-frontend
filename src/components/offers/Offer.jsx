import React from "react";

// Libraries
import { useDispatch } from "react-redux";
import Moment from "react-moment";

// Components
import { priceFormat, addCommission } from "components/helper";

// Actions
import { AoROfferAction, Profile } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Design
import "./offer.scss";

const Offer = ({ offer, project }) => {
  const dispatch = useDispatch();

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

  return (
    <div key={offer.id} className="offer">
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
      <div className="accept-reject-wrapper no-select">
        <div className="accept" onClick={() => openAoRModal(offer, "accept")}>
          <i className="icon icon-check-green" />
        </div>
        <div className="reject" onClick={() => openAoRModal(offer, "reject")}>
          <i className="icon icon-close-red" />
        </div>
      </div>
      <div className="offer-created-at">
        <Moment fromNow locale="fa">
          {offer.created_at}
        </Moment>
      </div>
    </div>
  );
};

export default Offer;
