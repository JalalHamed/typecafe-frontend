let initialState = {
  isSidebarOpen: true,
  page: "projects",
};

const SideBar = (state = initialState, action) => {
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

export default SideBar;
