let initialState = {
  offersLoading: true,
  myOffersLoading: true,
  offers: [],
  myOffers: [],
};

const Offers = (state = initialState, action) => {
  switch (action.type) {
    case "OFFERS":
      return { ...state, ...action.payload };
    case "REMOVE_DELETED_RPOJECT_OFFER":
      return {
        ...state,
        myOffers: state.myOffers.filter(
          offer => offer.project !== action.payload.id
        ),
      };
    case "CHANGE_OFFER_STATUS":
      return {
        ...state,
        offers: state.offers.map(offer => {
          if (offer.id === action.payload.id) {
            offer.status = action.payload.status;
          }
          return offer;
        }),
      };
    case "CHANGE_myOffer_STATUS":
      return {
        ...state,
        myOffers: state.myOffers.map(offer => {
          if (offer.id === action.payload.id) {
            offer.status = action.payload.status;
          }
          return offer;
        }),
      };
    case "REMOVE_ALL_OTHER_TYPISTS_myOfferS":
      return {
        ...state,
        myOffers: state.myOffers.filter(
          offer => offer.project === action.payload.project
        ),
      };
    case "REMOVE_NOT_ACCEPTED_OFFERS_ON_THE_PROJECT":
      return {
        ...state,
        offers: state.offers.filter(
          offer =>
            offer.project !== action.payload.project ||
            offer.id === action.payload.offer
        ),
      };
    case "REMOVE_BUSY_TYPIST_OFFERS_ON_OTHER_PROJECTS":
      return {
        ...state,
        offers: state.offers.filter(
          offer =>
            offer.typist_id !== action.payload.typist ||
            offer.project === action.payload.project
        ),
      };
    case "REMOVE_NOT_ACCEPTED_myOfferS_FOR_OTHER_TYPISTS":
      return {
        ...state,
        myOffers: state.myOffers.filter(
          myoffer => myoffer.project !== action.payload.project
        ),
      };
    case "ADD_OFFER_TYPIST_READY_TIME":
      return {
        ...state,
        offers: state.offers.map(offer => {
          if (offer.project === action.payload.project) {
            offer.typist_ready = action.payload.typist_ready;
          }
          return offer;
        }),
      };
    case "ADD_myOffer_TYPIST_READY_TIME":
      return {
        ...state,
        myOffers: state.myOffers.map(offer => {
          if (offer.project === action.payload.project) {
            offer.typist_ready = action.payload.typist_ready;
          }
          return offer;
        }),
      };
    default:
      return state;
  }
};

export default Offers;
