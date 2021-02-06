let initialState = {
  isModalOpen: false,
  page: "Email",
  email: "",
  timeleft: 0,
};

const LR = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REGISTER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default LR;
