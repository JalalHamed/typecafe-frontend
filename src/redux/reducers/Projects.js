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
    case "PROJECT_IN_PROGRESS":
      return {
        ...state,
        projects: state.projects.map(project => {
          if (project.id === action.payload.id) {
            project.status = "IP";
          }
          return project;
        }),
      };
    default:
      return state;
  }
};

export default Projects;
