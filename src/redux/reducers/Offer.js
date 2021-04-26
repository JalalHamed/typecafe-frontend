let initialState = {
  isModalOpen: false,
  selectedPagesCount: 0,
  selectedPricePerPage: 0,
  selectedDeadline: 0,
  selectedId: "",
};

const Offer = (state = initialState, action) => {
  switch (action.type) {
    case "OFFER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Offer;
