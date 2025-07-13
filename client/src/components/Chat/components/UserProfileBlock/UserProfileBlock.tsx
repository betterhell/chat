import React, { useState } from "react";
import styles from "./styles.module.scss";

import ProfileIcon from "../../../../assets/icons/ProfileIcon";
import SpeakerIcon from "../../../../assets/icons/SpeakerIcon";
import StatusIcon from "../../../../assets/icons/StatusIcon";
import NewChatIcon from "../../../../assets/icons/NewChatIcon";
import SettingsIcon from "../../../../assets/icons/SettingsIcon";
import Profile from "../../../Profile/Profile";

import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../../../store/user.store";
import { API_URL } from "../../../../config";

const UserProfileBlock = () => {
  const navigate = useNavigate();

  const [profileActive, setProfileActive] = useState<boolean>(false);

  const { user, logout} = useUserStore();

  const userKey = `${user?._id || 'no-user'}-${user?.avatar?.name || 'no-avatar'}-${user?.username || 'no-username'}`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleProfile = () => {
    setProfileActive(!profileActive);
  };

  return (
    <div className={styles.user_profile} key={userKey}>
      <div onClick={toggleProfile} className={styles.user_profile__info}>
        {user?.avatar?.name ? (
          <img
            className={styles.user_avatar}
            src={`${API_URL}/data/uploads/${user.avatar.name}`}
            alt="avatar"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallbackElement) {
                fallbackElement.classList.remove('hidden');
                fallbackElement.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <div 
          className={`${styles.user_avatar_fallback} ${user?.avatar?.name ? 'hidden' : ''}`}
          style={{ display: user?.avatar?.name ? 'none' : 'flex' }}
        >
          <ProfileIcon width="40" height="40" />
        </div>
        <h3>{user?.username || 'User'}</h3>
      </div>
      <div className={styles.user_profile__actions}>
        <button>
          <SpeakerIcon />
        </button>
        <button>
          <StatusIcon />
        </button>
        <button>
          <NewChatIcon />
        </button>
        <button>
          <SettingsIcon />
        </button>
        <button onClick={handleLogout}>
          <TbLogout size={24} stroke="#54656F" />
        </button>
      </div>
      {profileActive ? (
        <Profile isActive={profileActive} />
      ) : (
        <Profile isActive={profileActive} />
      )}
    </div>
  );
};

export default UserProfileBlock;
