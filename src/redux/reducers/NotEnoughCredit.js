const NotEnoughCredit = (state = false, action) => {
  switch (action.type) {
    case "NOT_ENOUGH_CREDIT":
      return action.payload;
    default:
      return state;
  }
};

export default NotEnoughCredit;
