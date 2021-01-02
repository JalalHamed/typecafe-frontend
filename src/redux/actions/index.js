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

export const openLoginRegisterModal = () => {
  return {
    type: "OPEN_LOGIN_REGISTER_MODAL",
  };
};

export const closeLoginRegisterModal = () => {
  return {
    type: "CLOSE_LOGIN_REGISTER_MODAL",
  };
};
