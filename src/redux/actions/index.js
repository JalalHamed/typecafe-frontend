export const changePage = title => {
  return {
    type: "CHANGE_PAGE",
    payload: title,
  };
};

export const toggleSideBar = () => {
  return {
    type: "TOGGLE_SIDE_BAR",
  };
};
