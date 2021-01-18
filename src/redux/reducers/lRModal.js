const lRModal = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: true };
    case "CLOSE_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default lRModal;
