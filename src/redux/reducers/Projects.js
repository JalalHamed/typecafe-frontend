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
    case "CHANGE_PROJECT_STATUS":
      return {
        ...state,
        projects: state.projects.map(project => {
          if (project.id === action.payload.id) {
            project.status = action.payload.status;
          }
          return project;
        }),
      };
    case "CHANGE_MY_PROJECT_STATUS":
      return {
        ...state,
        myprojects: state.projects.map(project => {
          if (project.id === action.payload.id) {
            project.status = action.payload.status;
          }
          return project;
        }),
      };
    default:
      return state;
  }
};

export default Projects;
