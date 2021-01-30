// Libraries
import { combineReducers } from "redux";

// Components
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";
import Project from "./Project";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
  Project,
});

export default allReducers;
