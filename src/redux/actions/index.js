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

export const Project = payload => {
  return {
    type: "PROJECT",
    payload,
  };
};
