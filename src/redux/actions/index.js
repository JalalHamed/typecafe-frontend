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

export const openLrModal = payload => {
  return {
    type: "OPEN_LOGIN_REGISTER_MODAL",
    payload,
  };
};

export const closeLrModal = () => {
  return {
    type: "CLOSE_LOGIN_REGISTER_MODAL",
  };
};

export const userLogIn = () => {
  return {
    type: "LOGIN",
  };
};

export const userLogOut = () => {
  return {
    type: "LOGOUT",
  };
};
