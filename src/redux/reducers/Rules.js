const Rules = (state = "", action) => {
  switch (action.type) {
    case "RULES_SCROLL_TO":
      return action.payload;
    default:
      return state;
  }
};

export default Rules;
