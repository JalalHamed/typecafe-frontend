// Libraries
import { combineReducers } from "redux";

// Components
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";
import CreateProject from "./CreateProject";
import SelectedImage from "./SelectedImage";
import Notifications from "./Notifications";
import CreateOffer from "./CreateOffer";
import DeleteProject from "./DeleteProject";
import Requested from "./Requested";
import Offers from "./Offers";
import Projects from "./Projects";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
  CreateProject,
  SelectedImage,
  Notifications,
  CreateOffer,
  DeleteProject,
  Requested,
  Offers,
  Projects,
});

export default allReducers;
