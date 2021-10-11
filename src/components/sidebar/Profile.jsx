import { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import RippleWrapper from "components/ripple/RippleWrapper";

// Functions
import { priceFormat } from "components/helper";

// Actions
import { Profile } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

const TheProfile = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(state => state.Sidebar.isOpen);
  const user = useSelector(state => state.User);

  return (
    <RippleWrapper
      className={`user-profile ${
        isSidebarOpen ? "sidebar-profile-wide" : "sidebar-profile-short"
      } no-select`}
      onClick={() =>
        dispatch(
          Profile({
            isModalOpen: true,
            id: user.id,
          })
        )
      }
      ref={ref}
    >
      {user.image ? (
        <img
          src={baseURL + user.image}
          alt="User Profile"
          className={`user-image ${
            isSidebarOpen ? "user-image-wide" : "user-image-short"
          }`}
        />
      ) : (
        <i
          className={`icon ${
            isSidebarOpen
              ? "icon-user-default-big"
              : "icon-user-default-regular"
          } icon-margin-18`}
        />
      )}
      <div
        className={
          isSidebarOpen ? "sidebar-profile-text" : "sidebar-profile-no-text"
        }
      >
        {user.displayname}
        <p className="sidebar-profile-credit">
          اعتبار: {priceFormat(user.credit)}
        </p>
      </div>
    </RippleWrapper>
  );
});

export default TheProfile;
