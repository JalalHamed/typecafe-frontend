let initialState = {
  getProjects: 0,
  isModalOpen: true,
  selectedPagesCount: 0,
  selectedPricePerPage: 0,
};

const Projects = (state = initialState, action) => {
  switch (action.type) {
    case "PROJECT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Projects;
