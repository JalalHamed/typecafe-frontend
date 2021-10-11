import { useEffect, useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Offer from "components/offer/Offer";
import { farsiNumber, remainingTime } from "components/helper";

// Actions
import { ClientAccept } from "redux/actions";

// Designs
import "./open.scss";

const ReceivedOffers = ({ project }) => {
  const dispatch = useDispatch();
  const ClientAcceptState = useSelector(state => state.ClientAccept);
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
        if (offer.client_accept && remainingTime(offer.client_accept, 30) >= 0)
          dispatch(
            ClientAccept({
              project: project.id,
              issued_at: offer.client_accept,
              client: project.client,
              offer: offer.id,
            })
          );
      });
    } else {
      setOffers([]);
    }

    // eslint-disable-next-line
  }, [Offers]);

  return (
    <>
      {ClientAcceptState.project !== project.id ? (
        <>
          {!!offers.length ? (
            <div className="has-offers-wrapper">
              <div className="offers-title-wrapper">
                <p>پیشنهادها</p>
                <span className="number-of-offers">
                  ({farsiNumber(offers.length)})
                </span>
              </div>
              <div className="request-wrapper">
                {offers.map(offer => {
                  return (
                    <Offer offer={offer} project={project} key={offer.id} />
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
        <div className="has-offers-wrapper no-height">
          <p className="waiting-for-typist-note">
            در انتظار اعلام آمادگی تاپیست
          </p>
          <Offer
            project={project}
            offer={offers.find(x => x.id === ClientAcceptState.offer)}
            countdown
          />
        </div>
      )}
    </>
  );
};

export default ReceivedOffers;
