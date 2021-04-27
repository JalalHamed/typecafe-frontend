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
import Downloaded from "./Downloaded";
import Requested from "./Requested";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
  CreateProject,
  SelectedImage,
  Notifications,
  Offer,
  DeleteProject,
  Downloaded,
  Requested,
});

export default allReducers;
