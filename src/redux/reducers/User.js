let initialState = {
  isLoggedIn: true,
  isModalOpen: false,
  isDropdownOpen: false,
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
