let initialState = {
  isOpen: true,
  isLoading: true,
  page: "messages",
};

const Sidebar = (state = initialState, action) => {
  switch (action.type) {
    case "SIDEBAR":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default Sidebar;
