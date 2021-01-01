const IsSideBarOpen = (state = true, action) => {
  switch (action.type) {
    case "TOGGLE_SIDE_BAR":
      return !state;
    default:
      return state;
  }
};

export default IsSideBarOpen;
