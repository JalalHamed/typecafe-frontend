// Libraries
import { combineReducers } from "redux";

// Components
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";
import CreateProject from "./CreateProject";
import SelectedImage from "./SelectedImage";
import Notifications from "./Notifications";
import Offer from "./Offer";
import DeleteProject from "./DeleteProject";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
  CreateProject,
  SelectedImage,
  Notifications,
  Offer,
  DeleteProject,
});

export default allReducers;
