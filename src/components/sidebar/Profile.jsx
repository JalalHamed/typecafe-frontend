import React from "react";

// Image
import profilePicture from "assets/images/profile-picture.png";

const Profile = () => {
  return (
    <div className="user-profile">
      <div className="user-profile_photo">
        <img src={profilePicture} alt="Default" className="profile-picture" />
      </div>
      <div className="user-profile_info">نام کاربری</div>
    </div>
  );
};

export default Profile;
