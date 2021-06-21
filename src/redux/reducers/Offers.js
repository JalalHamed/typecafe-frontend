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
    case "CHANGE_OFFERED_STATUS":
      return {
        ...state,
        offereds: state.offereds.map(offer => {
          if (offer.id === action.payload.id) {
            offer.status = "REJ";
          }
          return offer;
        }),
      };
    case "REMOVE_BUSY_TYPIST_OFFER":
      return {
        ...state,
        offers: state.offers.filter(
          offer => offer.typist_id !== action.payload.id
        ),
      };
    case "ADD_TYPIST_READY_TIME":
      return {
        ...state,
        offereds: state.offereds.map(offer => {
          if (offer.project === action.payload.project) {
            offer["typist_ready"] = action.payload.typist_ready;
          }
          return offer;
        }),
      };
    default:
      return state;
  }
};

export default Offers;
