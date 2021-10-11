// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Email from "./Email";
import Login from "./Login";
import ConfirmEmail from "./ConfirmEmail";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

// Actions
import { LR, Sidebar } from "redux/actions";

// Designs
import "../loginregister.scss";

const RightSide = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.LR.page);
  const sidebarPage = useSelector(state => state.Sidebar.page);

  const handleRulesClick = () => {
    dispatch(LR({ isModalOpen: false }));
    if (sidebarPage !== "rules") {
      dispatch(Sidebar({ page: "rules" }));
    }
  };

  return (
    <>
      {page === "Email" && <Email />}
      {page === "Login" && <Login />}
      {page === "ConfirmEmail" && <ConfirmEmail />}
      {page === "Register" && <Register />}
      {page === "ForgotPassword" && <ForgotPassword />}
      <div className="usage-agreement">
        ورود یا ثبت‌نام در تایپ‌کافه، به منزله‌ی پذیرش{" "}
        <span className="rules" onClick={handleRulesClick}>
          قوانین
        </span>{" "}
        می‌باشد.
      </div>
    </>
  );
};

export default RightSide;
