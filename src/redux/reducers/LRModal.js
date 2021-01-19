let initialState = {
  isOpen: false,
  page: "Email",
  username: "",
  email: "",
};

const LRModal = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: true };
    case "LOGIN_REGISTER_MODAL":
      return {
        ...state,
        ...action.payload,
      };
    case "CLOSE_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default LRModal;
