let initialState = {
  isDorpdownOpen: false,
};

const Notifications = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Notifications;
