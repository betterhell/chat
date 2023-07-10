import React from "react";
import styles from "./styles.module.scss";
import { useUserStore } from "../../store/user.store";

interface ProfileProps {
  isActive: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isActive }) => {
  const { user } = useUserStore();

  return (
    <div
      className={
        isActive
          ? `${styles.profile__info_enabled}`
          : `${styles.profile__info_disabled}`
      }
    >
      <h2>Profile</h2>
      <input placeholder={user?.username} type="text" />
      <input placeholder={user?.email} type="text" />
    </div>
  );
};

export default Profile;
