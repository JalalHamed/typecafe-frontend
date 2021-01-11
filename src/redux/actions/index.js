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

export const openlRModal = payload => {
  return {
    type: "OPEN_LOGIN_REGISTER_MODAL",
    payload,
  };
};

export const closelRModal = () => {
  return {
    type: "CLOSE_LOGIN_REGISTER_MODAL",
  };
};

export const lRModalLoginFirstMount = () => {
  return {
    type: "LOGIN_FIRST_MOUNT",
  };
};

export const lRModalRegisterFirstMount = () => {
  return {
    type: "REGISTER_FIRST_MOUNT",
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
