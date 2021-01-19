// Libraries
import { combineReducers } from "redux";

// Components
import isLoggedIn from "./isLoggedIn";
import page from "./page";
import isSideBarOpen from "./isSideBarOpen";
import LRModal from "./LRModal";

const allReducers = combineReducers({
  isLoggedIn,
  page,
  isSideBarOpen,
  LRModal,
});

export default allReducers;
