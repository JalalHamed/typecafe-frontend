let initialState = {
  newProject: 0,
  newMessage: 0,
  clientAccept: 0,
  typistAccept: 0,
  typistFailedToAccept: 0,
};

const Sounds = (state = initialState, action) => {
  switch (action.type) {
    case "SOUNDS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Sounds;
