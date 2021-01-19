let initialState = {
  isOpen: false,
  page: "Email",
  username: "",
};

const LRModal = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: true };
    case "LOGIN_REGISTER_MODAL":
      return {
        ...state,
        page: action.payload.page,
        username: action.payload.username,
      };
    case "CLOSE_LOGIN_REGISTER_MODAL":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default LRModal;
