const LoginRegisterModal = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_REGISTER_MODAL":
      return { isOpen: true, page: action.payload };
    case "CLOSE_LOGIN_REGISTER_MODAL":
      return { isOpen: false };
    default:
      return state;
  }
};

export default LoginRegisterModal;
