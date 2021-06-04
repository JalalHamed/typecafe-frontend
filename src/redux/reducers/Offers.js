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
    default:
      return state;
  }
};

export default Offers;
