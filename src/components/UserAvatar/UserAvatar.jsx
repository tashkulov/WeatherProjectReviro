import React from "react";
import avatarImage from "../../assets/avatar/userAvatar.png";
import "./UserAvatar.css";

const UserAvatar = () => {
  return (
    <div className="user-avatar">
      <img src={avatarImage} alt="User Avatar" className="avatar_img" />
    </div>
  );
};

export default UserAvatar;
