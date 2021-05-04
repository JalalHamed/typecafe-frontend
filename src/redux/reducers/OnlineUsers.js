let initialState = {
  ids: [],
  disconnects: [],
  lastLogins: [],
};

const OnlineUsers = (state = initialState, action) => {
  switch (action.type) {
    case "ONLINE_USERS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default OnlineUsers;
