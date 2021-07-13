let initialState = {
  offersLoading: true,
  offeredsLoading: true,
  offers: [],
  myoffers: [],
};

const Offers = (state = initialState, action) => {
  switch (action.type) {
    case "OFFERS":
      return { ...state, ...action.payload };
    case "REMOVE_DELETED_RPOJECT_OFFER":
      return {
        ...state,
        myoffers: state.myoffers.filter(
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
        myoffers: state.myoffers.map(offer => {
          if (offer.id === action.payload.id) {
            offer.status = action.payload.status;
          }
          return offer;
        }),
      };
    case "REMOVE_ALL_OTHER_TYPISTS_OFFEREDS":
      return {
        ...state,
        myoffers: state.myoffers.filter(
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
    case "REMOVE_NOT_ACCEPTED_OFFEREDS_FOR_OTHER_TYPISTS":
      return {
        ...state,
        myoffers: state.myoffers.filter(
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
    case "ADD_OFFERED_TYPIST_READY_TIME":
      return {
        ...state,
        myoffers: state.myoffers.map(offer => {
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
