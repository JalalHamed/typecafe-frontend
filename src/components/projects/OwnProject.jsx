import React, { useEffect, useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment/locale/fa";

// Components
import { priceFormat, addCommission, farsiNumber } from "components/helper";
import { Puffloader } from "components/loader";

// Actions
import { AoROfferAction, Profile } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

const OwnProject = ({ project }) => {
  const dispatch = useDispatch();
  const Offers = useSelector(state => state.Projects.offers);
  const isLoading = useSelector(state => state.Projects.offersLoading);
  const [offers, setOffers] = useState([]);

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
    if (Offers.length && Offers.find(offer => offer.project === project.id)) {
      setOffers([]);
      Offers.forEach(offer => {
        if (offer.project === project.id && offer.status === "A") {
          setOffers(prevState => [...prevState, offer]);
        }
      });
    } else {
      setOffers([]);
    }

    // eslint-disable-next-line
  }, [Offers]);

  return (
    <>
      {!isLoading ? (
        <>
          {!!offers.length ? (
            <div className="has-offers-wrapper">
              <div className="offers-title-wrapper">
                <p className="offers-title">پیشنهادها</p>
                <span className="number-of-offers">
                  ({farsiNumber(offers.length)})
                </span>
              </div>
              <div className="request-wrapper">
                {offers.map(offer => {
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
                        <span className="offered-price-title">
                          قیمت پیشنهادی
                        </span>
                        <span className="offered-price">
                          {priceFormat(offer.offered_price)}
                        </span>
                      </div>
                      <div className="offered-price-wrapper">
                        <span className="offered-price-title">جمع کل</span>
                        <span className="offered-price">
                          {priceFormat(
                            addCommission(
                              offer.offered_price * project.number_of_pages
                            )
                          )}
                        </span>
                      </div>
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
                      <div className="offer-created-at">
                        <Moment fromNow locale="fa">
                          {offer.created_at}
                        </Moment>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="no-offer-wrapper">
              <p>هنوز هیچ پیشنهادی ندارید.</p>
            </div>
          )}
        </>
      ) : (
        <Puffloader color="#1c3987" loading={true} size={100} />
      )}
    </>
  );
};

export default OwnProject;
