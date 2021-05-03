let initialState = {
  isLoggedIn: false,
  isModalOpen: false,
  isDropdownOpen: false,
  displayname: "",
  id: null,
  email: "",
  credit: 0,
  image: "",
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
