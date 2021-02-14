// Libraries
import { combineReducers } from "redux";

// Components
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";
import CreateProject from "./CreateProject";
import SelectedImage from "./SelectedImage";
import Notifications from "./Notifications";
import Projects from "./Projects";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
  CreateProject,
  SelectedImage,
  Notifications,
  Projects,
});

export default allReducers;
