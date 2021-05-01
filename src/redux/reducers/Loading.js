let initialState = {
  isLoading: false,
};

const Loading = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Loading;
