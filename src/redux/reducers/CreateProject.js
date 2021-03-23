let initialState = {
  isModalOpen: true,
  step: "uploadfile",
  file: [],
  description: "",
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
