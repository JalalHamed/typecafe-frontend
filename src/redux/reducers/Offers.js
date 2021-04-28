let initialState = {
  offers: [],
};

const Offers = (state = initialState, action) => {
  switch (action.type) {
    case "OFFERS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Offers;
