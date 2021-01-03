const LoginRegisterModal = (state = { isOpen: true }, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_REGISTER_MODAL":
      return { isOpen: true, ...action.payload };
    case "CLOSE_LOGIN_REGISTER_MODAL":
      return { isOpen: false };
    default:
      return state;
  }
};

export default LoginRegisterModal;
