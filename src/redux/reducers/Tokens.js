let initialState = {
  ac_t: "",
  re_t: "",
};

const Tokens = (state = initialState, action) => {
  switch (action.type) {
    case "TOKENS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Tokens;
