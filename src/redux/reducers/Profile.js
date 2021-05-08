const initialState = {
  isModalOpen: false,
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
