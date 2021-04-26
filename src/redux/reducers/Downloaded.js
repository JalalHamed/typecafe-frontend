let initialState = {
  ids: [],
};

const Downloaded = (state = initialState, action) => {
  switch (action.type) {
    case "DOWNLOADED":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Downloaded;
