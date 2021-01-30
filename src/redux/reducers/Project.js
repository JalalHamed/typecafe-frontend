let initialState = {
  addnew: {
    step: "uploadfiles",
    files: [],
    description: "",
    pages: 0,
  },
};

const Project = (state = initialState, action) => {
  switch (action.type) {
    case "Project":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default Project;
