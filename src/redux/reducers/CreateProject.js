let initialState = {
  isModalOpen: true,
  firstMount: false,
  step: "details",
  file: "",
  languages: [],
  numberOfPages: "",
  deliveryDeadline: "",
  description: "",
  detailsComplete: false,
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
