let initialState = {
  getProjects: 0,
};

const Projects = (state = initialState, action) => {
  switch (action.type) {
    case "PROJECTS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Projects;
