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

export const Notifications = payload => {
  return {
    type: "NOTIFICATION",
    payload,
  };
};

export const CreateOffer = payload => {
  return {
    type: "CREATE_OFFER",
    payload,
  };
};

export const ProjectsAction = payload => {
  return {
    type: "PROJECTS",
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
