// Libraries
import { combineReducers } from "redux";

// Reducers
import Loading from "./Loading";
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";
import CreateProject from "./CreateProject";
import SelectedImage from "./SelectedImage";
import CreateOffer from "./CreateOffer";
import DeleteProject from "./DeleteProject";
import Projects from "./Projects";
import Offers from "./Offers";
import AoROffer from "./AoROffer";
import OnlineUsers from "./OnlineUsers";
import Messages from "./Messages";
import Profile from "./Profile";
import NotEnoughCredit from "./NotEnoughCredit";
import Rules from "./Rules";
import Tokens from "./Tokens";
import ClientAccept from "./ClientAccept";
import Sounds from "./Sounds";

const allReducers = combineReducers({
  Loading,
  LR,
  Sidebar,
  User,
  CreateProject,
  SelectedImage,
  CreateOffer,
  DeleteProject,
  Projects,
  Offers,
  AoROffer,
  OnlineUsers,
  Messages,
  Profile,
  NotEnoughCredit,
  Rules,
  Tokens,
  ClientAccept,
  Sounds,
});

export default allReducers;
