// Libraries
import { combineReducers } from "redux";

// Components
import isLoggedIn from "./isLoggedIn";
import page from "./page";
import isSideBarOpen from "./isSideBarOpen";

const allReducers = combineReducers({
  isLoggedIn,
  page,
  isSideBarOpen,
});

export default allReducers;
