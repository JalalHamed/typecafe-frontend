let initialState = {
  ids: [],
};

const Requested = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Requested;
