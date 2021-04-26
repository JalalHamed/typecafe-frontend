let initialState = {
  isModalOpen: false,
  id: "",
};

const DeleteProject = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PROJECT":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default DeleteProject;
