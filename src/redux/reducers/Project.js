let initialState = {
  isModalOpen: false,
  selectedPagesCount: 0,
  selectedPricePerPage: 0,
  selectedDeadline: 0,
  selectedId: "",
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
