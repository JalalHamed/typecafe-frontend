const Offers = (state = [], action) => {
  switch (action.type) {
    case "OFFERS":
      return [...action.payload, ...state];
    default:
      return state;
  }
};

export default Offers;
