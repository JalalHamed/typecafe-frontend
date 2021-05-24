let initialState = {
  loading: true,
  myprojectsloading: true,
  offersLoading: true,
  offeredsLoading: true,
  downloadsLoading: true,
  projects: [],
  myprojects: [],
  offers: [],
  offereds: [],
  downloaded: [],
  next: "",
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
