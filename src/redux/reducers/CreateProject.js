let initialState = {
  isModalOpen: false,
  step: "uploadpics",
  files: [],
  description: "",
  firstMount: false,
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
