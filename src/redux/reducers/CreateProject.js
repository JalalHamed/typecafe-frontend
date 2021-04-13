let initialState = {
  isModalOpen: false,
  firstMount: true,
  step: "uploadfile",
  file: "",
  languagesAndAdditions: [],
  numberOfPages: "",
  deliveryDeadline: "",
  type: "",
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
