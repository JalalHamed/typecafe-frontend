let initialState = {
  isLoggedIn: false,
  isTopbarLoading: true,
  isDropdownOpen: false,
  displayname: "",
  id: null,
  email: "",
  credit: 0,
  image: "",
  successfulProjects: 0,
  unsuccessfulProjects: 0,
  ontimeDelivery: 0,
  playSounds: false,
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default User;
