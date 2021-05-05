import React, { useEffect, useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment/locale/fa";

// Components
import { priceFormat, addCommission, farsiNumber } from "components/helper";

// Actions
import { AoROfferAction } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

const OwnProject = ({ project }) => {
  const dispatch = useDispatch();
  const allOffers = useSelector(state => state.Offers.offers);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (allOffers.length) {
      setOffers([]);
      allOffers.forEach(offer => {
        if (offer.project === project.id && offer.status === "A") {
          setOffers(prevState => [...prevState, offer]);
        }
      });
    }

    // eslint-disable-next-line
  }, [allOffers]);

  return (
    <>
      {!!offers.length ? (
        <>
          <div className="offers-title-wrapper">
            <p className="offers-title">پیشنهادها</p>
            <p className="number-of-offers">({farsiNumber(offers.length)})</p>
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
                        className="typist-image"
                      />
                    ) : (
                      <i className="icon offer-typist-default-pic" />
                    )}
                    <span className="typist-displayname">{offer.typist}</span>
                  </div>
                  <div className="offered-price-wrapper">
                    <span className="offered-price-title">قیمت پیشنهادی</span>
                    <span className="offered-price">
                      {priceFormat(offer.offered_price)}
                    </span>
                  </div>
                  <div className="offered-price-wrapper">
                    <span className="offered-price-title">مبلغ کل</span>
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
                      onClick={() =>
                        dispatch(
                          AoROfferAction({
                            isModalOpen: true,
                            typist: offer.typist,
                            typistImage: offer.typist_image,
                            offeredPrice: offer.offered_price,
                            wholePrice: addCommission(
                              offer.offered_price * project.number_of_pages
                            ),
                            status: "accept",
                          })
                        )
                      }
                    >
                      <i className="icon icon-check-green" />
                    </div>
                    <div
                      className="reject"
                      onClick={() =>
                        dispatch(
                          AoROfferAction({
                            isModalOpen: true,
                            typist: offer.typist,
                            typistImage: offer.typist_image,
                            offeredPrice: offer.offered_price,
                            wholePrice: addCommission(
                              offer.offered_price * project.number_of_pages
                            ),
                            status: "reject",
                          })
                        )
                      }
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
        </>
      ) : (
        <div className="no-offer-wrapper">
          <i className="icon icon-leafless-tree" />
          <p>هنوز هیچ پیشنهادی ندارید.</p>
        </div>
      )}
    </>
  );
};

export default OwnProject;
