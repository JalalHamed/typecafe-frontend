let initialState = {
  isModalOpen: false,
  client: "",
  project: null,
  issued_at: null,
  offer: null,
};

const ClientAccept = (state = initialState, action) => {
  switch (action.type) {
    case "CLIENT_ACCEPT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ClientAccept;
