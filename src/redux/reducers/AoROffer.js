let initialState = {
  isModalOpen: false,
  typist: "",
  typistImage: "",
  offeredPrice: 0,
  wholePrice: 0,
};

const AoROffer = (state = initialState, action) => {
  switch (action.type) {
    case "AOROFFER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default AoROffer;
