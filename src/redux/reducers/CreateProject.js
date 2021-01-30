let initialState = {
  isModalOpen: false,
  step: "uploadpics",
  files: [],
  description: "",
  pages: 0,
};

const CreateProject = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default CreateProject;
