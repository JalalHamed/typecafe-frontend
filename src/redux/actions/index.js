export const Loading = payload => {
  return {
    type: "LOADING",
    payload,
  };
};

export const LR = payload => {
  return {
    type: "LOGIN_REGISTER",
    payload,
  };
};

export const Sidebar = payload => {
  return {
    type: "SIDEBAR",
    payload,
  };
};

export const User = payload => {
  return {
    type: "USER",
    payload,
  };
};

export const CreateProject = payload => {
  return {
    type: "CREATE_PROJECT",
    payload,
  };
};

export const DeleteProject = payload => {
  return {
    type: "DELETE_PROJECT",
    payload,
  };
};

export const SelectedImage = payload => {
  return {
    type: "SELECTED_IMAGE",
    payload,
  };
};

export const CreateOffer = payload => {
  return {
    type: "CREATE_OFFER",
    payload,
  };
};

export const ChangeOfferedStatus = payload => {
  return {
    type: "CHANGE_OFFERED_STATUS",
    payload,
  };
};

export const RemoveDeletedProjectOffer = payload => {
  return {
    type: "REMOVE_DELETED_RPOJECT_OFFER",
    payload,
  };
};

export const RemoveBusyTypistOffer = payload => {
  return {
    type: "REMOVE_BUSY_TYPIST_OFFER",
    payload,
  };
};

export const ProjectsAction = payload => {
  return {
    type: "PROJECTS",
    payload,
  };
};

export const OffersAction = payload => {
  return {
    type: "OFFERS",
    payload,
  };
};

export const AoROfferAction = payload => {
  return {
    type: "AOROFFER",
    payload,
  };
};

export const OnlineUsers = payload => {
  return {
    type: "ONLINE_USERS",
    payload,
  };
};

export const Profile = payload => {
  return {
    type: "PROFILE",
    payload,
  };
};

export const Messages = payload => {
  return {
    type: "MESSAGES",
    payload,
  };
};

export const NewMessageAction = payload => {
  return {
    type: "NEW_MESSAGE",
    payload,
  };
};

export const ReadMessagesAction = payload => {
  return {
    type: "READ_MESSAGES",
    payload,
  };
};

export const MessagesElse = payload => {
  return {
    type: "MESSAGES_ELSE",
    payload,
  };
};

export const NotEnoughCreditAction = payload => {
  return {
    type: "NOT_ENOUGH_CREDIT",
    payload,
  };
};

export const RulesScrollTo = payload => {
  return {
    type: "RULES_SCROLL_TO",
    payload,
  };
};

export const Tokens = payload => {
  return {
    type: "TOKENS",
    payload,
  };
};

export const ClientAccept = payload => {
  return {
    type: "CLIENT_ACCEPT",
    payload,
  };
};

export const Sounds = payload => {
  return {
    type: "SOUNDS",
    payload,
  };
};

export const AddOfferedTypistReadyTime = payload => {
  return {
    type: "ADD_OFFERED_TYPIST_READY_TIME",
    payload,
  };
};

export const TypistReady = payload => {
  return {
    type: "TYPIST_READY",
    payload,
  };
};

export const ChangeProjectStatus = payload => {
  return {
    type: "CHANGE_PROJECT_STATUS",
    payload,
  };
};

export const ChangeMyProjectStatus = payload => {
  return {
    type: "CHANGE_MY_PROJECT_STATUS",
    payload,
  };
};
