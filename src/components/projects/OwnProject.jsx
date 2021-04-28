import React, { useEffect, useState } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import { PriceFormat } from "components/helper";

// XHR
import { baseURL } from "components/xhr";

const OwnProject = ({ project }) => {
  const allOffers = useSelector(state => state.Offers.offers);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (allOffers.length) {
      allOffers.forEach(offer => {
        if (offer.project === project.id) {
          setOffers(prevState => [...prevState, offer]);
        } else {
          setOffers([]);
        }
      });
    }

    // eslint-disable-next-line
  }, [allOffers]);

  return (
    <>
      {!!offers.length ? (
        <div className="request-wrapper">
          {offers.map((offer, index) => {
            return (
              <div key={index} className="offer">
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
                    {PriceFormat(offer.offered_price)}
                  </span>
                </div>
                <div className="offered-price-wrapper">
                  <span className="offered-price-title">مبلغ کل</span>
                  <span className="offered-price">
                    {PriceFormat(offer.offered_price)}
                  </span>
                </div>
                <div className="accept-reject-wrapper">
                  <div className="check">
                    <i className="icon icon-check-green" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
