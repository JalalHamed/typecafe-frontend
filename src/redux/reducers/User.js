let initialState = {
  isLoggedIn: false,
  isModalOpen: false,
  isDropdownOpen: false,
  accessToken: "",
  refreshToken: "",
  displayname: "",
  email: "",
  credit: 0,
  picture: "",
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
