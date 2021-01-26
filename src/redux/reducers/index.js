// Libraries
import { combineReducers } from "redux";

// Components
import LR from "./LR";
import Sidebar from "./Sidebar";
import User from "./User";

const allReducers = combineReducers({
  LR,
  Sidebar,
  User,
});

export default allReducers;
