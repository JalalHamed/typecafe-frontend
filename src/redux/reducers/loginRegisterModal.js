const LoginRegisterModal = (state = false, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_REGISTER_MODAL":
      return true;
    case "CLOSE_LOGIN_REGISTER_MODAL":
      return false;
    default:
      return state;
  }
};

export default LoginRegisterModal;
