const lRModal = (
  state = { isOpen: false, loginFirstMount: true, registerFirstMount: true },
  action
) => {
  switch (action.type) {
    case "OPEN_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: true, page: action.payload };
    case "CLOSE_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: false };
    case "LOGIN_FIRST_MOUNT":
      return { ...state, loginFirstMount: false };
    case "REGISTER_FIRST_MOUNT":
      return { ...state, registerFirstMount: false };
    default:
      return state;
  }
};

export default lRModal;
