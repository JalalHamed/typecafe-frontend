// Libraries
import { useDispatch, useSelector } from "react-redux";

// Actions
import { User, Profile, Tokens } from "redux/actions";

// Designs
import "./dropdowns.scss";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);

  const handleLogout = () => {
    dispatch(Tokens({ ac_t: null, re_t: null }));
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleProfile = () => {
    dispatch(User({ isDropdownOpen: false }));
    dispatch(
      Profile({
        isModalOpen: true,
        id: user.id,
      })
    );
  };

  return (
    <div className="user-dropdown-wrapper no-select">
      <div className="user-dropdown-item" onClick={handleProfile}>
        پروفایل
      </div>
      <div className="user-dropdown-item" onClick={handleLogout}>
        خروج
      </div>
    </div>
  );
};

export default UserDropDown;
