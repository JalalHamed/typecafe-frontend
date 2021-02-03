let initialState = {
  isModalOpen: false,
  image: "",
};

const SelectedImage = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTED_IMAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default SelectedImage;
