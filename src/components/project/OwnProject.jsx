import React, { useEffect, useState } from "react";

// Libraries
import { useSelector } from "react-redux";
import "moment/locale/fa";

// Components
import Offer from "components/offer/Offer";
import { farsiNumber } from "components/helper";
import { Puffloader } from "components/loader";

const OwnProject = ({ project }) => {
  const isLoading = useSelector(state => state.Offers.offersLoading);
  const ClientAccept = useSelector(state => state.ClientAccept);
  const Offers = useSelector(state => state.Offers.offers);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (Offers.length && Offers.find(offer => offer.project === project.id)) {
      setOffers([]);
      Offers.forEach(offer => {
        if (
          offer.project === project.id &&
          (offer.status === "A" || offer.status === "ACC")
        ) {
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
          {ClientAccept.project !== project.id ? (
            <>
              {!!offers.length ? (
                <div className="has-offers-wrapper">
                  {project.status === "O" && (
                    <>
                      <div className="offers-title-wrapper">
                        <p className="offers-title">پیشنهادها</p>
                        <span className="number-of-offers">
                          ({farsiNumber(offers.length)})
                        </span>
                      </div>
                      <div className="request-wrapper">
                        {offers.map(offer => {
                          return (
                            <Offer
                              offer={offer}
                              project={project}
                              key={offer.id}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="no-offer-wrapper">
                  <p>هنوز هیچ پیشنهادی ندارید.</p>
                </div>
              )}
            </>
          ) : (
            <>
              <p>تایپیست ۳۰ ثانیه مهلت اعلام آمادگی دارد.</p>
              <p>لطفا منتظر بمانید.</p>
              <Offer
                project={project}
                offer={offers.find(x => x.id === ClientAccept.offer)}
              />
            </>
          )}
        </>
      ) : (
        <Puffloader color="#1c3987" loading={true} size={100} />
      )}
    </>
  );
};

export default OwnProject;
