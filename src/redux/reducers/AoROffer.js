let initialState = {
  isModalOpen: false,
  id: null,
  project_id: null,
  typist: "",
  typistImage: "",
  offeredPrice: 0,
  wholePrice: 0,
  status: "",
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
