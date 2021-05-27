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
    case "CHANGE_OFFERED_STATUS":
      return {
        ...state,
        offereds: state.offereds.map(offer => {
          if (offer.id === action.payload.id) {
            offer.status = "REJ";
          }
          return offer;
        }),
      };
    default:
      return state;
  }
};

export default Projects;
