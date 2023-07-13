import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useUserStore } from "../../store/user.store";

interface ProfileProps {
  isActive: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isActive }) => {
  const { user, update } = useUserStore();
  const [username, setUsername] = useState<string | null>();
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !avatar) return;
    update(username, avatar);
    location.reload();
  };

  return (
    <div
      className={
        isActive
          ? `${styles.profile__info_enabled}`
          : `${styles.profile__info_disabled}`
      }
    >
      <h2>Profile</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder={user?.username}
          type="text"
        />
        <input placeholder={user?.email} type="text" />
        <input onChange={(e) => setAvatar(e.target.files![0])} type="file" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
