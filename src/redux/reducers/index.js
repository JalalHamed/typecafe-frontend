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
import Offers from "./Offers";
import Projects from "./Projects";
import AoROffer from "./AoROffer";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
  CreateProject,
  SelectedImage,
  Notifications,
  CreateOffer,
  DeleteProject,
  Offers,
  Projects,
  AoROffer,
});

export default allReducers;
