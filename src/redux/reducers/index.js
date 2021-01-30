// Libraries
import { combineReducers } from "redux";

// Components
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";
import CreateProject from "./CreateProject";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
  CreateProject,
});

export default allReducers;
