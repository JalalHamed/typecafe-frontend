let initialState = {};

const Messages = (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGES":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Messages;
