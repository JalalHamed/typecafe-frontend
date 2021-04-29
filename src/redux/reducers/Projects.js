let initialState = {
  loading: false,
  myprojectsloading: false,
  projects: [],
  myprojects: [],
  next: "",
  downloaded: [],
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
