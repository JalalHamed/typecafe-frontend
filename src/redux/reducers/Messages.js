const Messages = (state = [], action) => {
  switch (action.type) {
    case "MESSAGES":
      return [...state, ...action.payload];
    case "NEW_MESSAGE":
      return state.map(user => {
        if (user.id === action.payload.id) {
          user.messages = [...user.messages, action.payload.message];
        }
        return user;
      });
    default:
      return state;
  }
};

export default Messages;
