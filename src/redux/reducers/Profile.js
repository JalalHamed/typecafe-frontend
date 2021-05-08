const initialState = {
  isModalOpen: false,
  isLoading: true,
  id: null,
  displayname: "",
  image: "",
  successfulProjects: 0,
  unsuccessfulProjects: 0,
  ontimeDelivery: 0,
  // if self
  email: "",
  credit: 0,
};

const Profile = (state = initialState, action) => {
  switch (action.type) {
    case "PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Profile;
