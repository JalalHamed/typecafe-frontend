let initialState = {
  loading: true,
  myprojectsloading: true,
  downloadsLoading: true,
  projects: [],
  myprojects: [],
  downloaded: [],
  next: "",
  error: false,
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
