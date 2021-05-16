const Rules = (state = false, action) => {
  switch (action.type) {
    case "RULES_SCROLL_TO_HTWW":
      return action.payload;
    default:
      return state;
  }
};

export default Rules;
