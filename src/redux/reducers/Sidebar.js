let initialState = {
  isOpen: true,
  isLoading: true,
  page: "rules",
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
