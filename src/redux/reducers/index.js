// Libraries
import { combineReducers } from "redux";

// Components
import Loading from "./Loading";
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";
import CreateProject from "./CreateProject";
import SelectedImage from "./SelectedImage";
import Notifications from "./Notifications";
import CreateOffer from "./CreateOffer";
import DeleteProject from "./DeleteProject";
import Projects from "./Projects";
import AoROffer from "./AoROffer";
import OnlineUsers from "./OnlineUsers";
import Messages from "./Messages";

const allReducers = combineReducers({
  Loading,
  LR,
  Sidebar,
  User,
  CreateProject,
  SelectedImage,
  Notifications,
  CreateOffer,
  DeleteProject,
  Projects,
  AoROffer,
  OnlineUsers,
  Messages,
});

export default allReducers;
