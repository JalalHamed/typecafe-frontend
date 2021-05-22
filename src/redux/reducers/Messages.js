let initialState = {
  messages: [],
  id: null,
  isWatching: null,
  isLoading: true,
  totalUnread: 0,
};

const Messages = (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGES":
      return { ...state, messages: [...state.messages, action.payload] };
    case "NEW_MESSAGE":
      return {
        ...state,
        messages: state.messages.map(user => {
          if (user.id === action.payload.id) {
            user.messages = [...user.messages, action.payload.message];
            if (
              action.payload.message.sor !== "sent" &&
              state.isWatching !== action.payload.id
            )
              user.unread += 1;
          }
          return user;
        }),
      };
    case "READ_MESSAGES":
      return {
        ...state,
        messages: state.messages.map(user => {
          if (user.id === action.payload.id) {
            user.unread = 0;
          }
          return user;
        }),
      };
    case "MESSAGES_ELSE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Messages;
