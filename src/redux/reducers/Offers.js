let initialState = {
  offersLoading: true,
  offeredsLoading: true,
  offers: [],
  offereds: [],
};

const Offers = (state = initialState, action) => {
  switch (action.type) {
    case "OFFERS":
      return { ...state, ...action.payload };
    case "REMOVE_DELETED_RPOJECT_OFFER":
      return {
        ...state,
        offereds: state.offereds.filter(
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
    case "CHANGE_OFFERED_STATUS":
      return {
        ...state,
        offereds: state.offereds.map(offer => {
          if (offer.id === action.payload.id) {
            offer.status = action.payload.status;
          }
          return offer;
        }),
      };
    case "REMOVE_NOT_ACCEPTED_OFFEREDS":
      return {
        ...state,
        offereds: state.offereds.filter(
          offer => offer.project === action.payload.project
        ),
      };
    case "REMOVE_NOT_ACCEPTED_OFFERS":
      return {
        ...state,
        offers: state.offers.filter(
          offer =>
            offer.project !== action.payload.project ||
            offer.id === action.payload.offer
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
    case "ADD_OFFERED_TYPIST_READY_TIME":
      return {
        ...state,
        offereds: state.offereds.map(offer => {
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
