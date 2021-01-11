// Libraries
import { combineReducers } from "redux";

// Components
import isLoggedIn from "./isLoggedIn";
import page from "./page";
import isSideBarOpen from "./isSideBarOpen";
import lRModal from "./lRModal";

const allReducers = combineReducers({
  isLoggedIn,
  page,
  isSideBarOpen,
  lRModal,
});

export default allReducers;
