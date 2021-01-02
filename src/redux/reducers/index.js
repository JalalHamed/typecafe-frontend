// Libraries
import { combineReducers } from "redux";

// Components
import isLoggedIn from "./isLoggedIn";
import page from "./page";
import isSideBarOpen from "./isSideBarOpen";
import loginRegisterModal from "./loginRegisterModal";

const allReducers = combineReducers({
  isLoggedIn,
  page,
  isSideBarOpen,
  loginRegisterModal,
});

export default allReducers;
