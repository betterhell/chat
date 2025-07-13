import React from "react";
import styles from "./styles.module.scss";
import ProfileIcon from "../../../../../assets/icons/ProfileIcon";
import { User } from "../../../../../models/user.model";
import { API_URL } from "../../../../../config";

interface ContactUserProps {
  user: User;
}

const ContactUser: React.FC<ContactUserProps> = ({ user }) => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>
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
          <ProfileIcon height="40" width="40" />
        </div>
      </div>
      <div className={styles.username}>
        <h3>{user.username}</h3>
      </div>
    </div>
  );
};

export default ContactUser;
