let initialState = {
  isModalOpen: false,
  project: null,
  issued_at: null,
  client: "",
  offer: null,
};

const ClientAccept = (state = initialState, action) => {
  switch (action.type) {
    case "CLIENT_ACCEPT":
      return action.payload;
    default:
      return state;
  }
};

export default ClientAccept;
