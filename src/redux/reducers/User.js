let initialState = {
  isLoggedIn: true,
  isLogoutModalOpen: false,
  displayname: "",
  email: "",
  credit: 0,
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default User;
