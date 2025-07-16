import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useUserStore } from "@/store/user.store";

interface ProfileProps {
  isActive: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isActive }) => {
  const { user, update, isLoading, isError } = useUserStore();
  const [username, setUsername] = useState<string | null>();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!avatar) {
      setMessage("Please select an avatar image");
      return;
    }
    
    // Если username не указан, используем текущее имя пользователя
    const usernameToUpdate = username || user?.username || '';
    if (!usernameToUpdate) {
      setMessage("Please enter a username");
      return;
    }
    
    setMessage("");
    try {
      await update(usernameToUpdate, avatar);
      setMessage("Profile updated successfully!");
      setUsername(null);
      setAvatar(null);
      const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      const usernameInput = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;
      if (usernameInput) usernameInput.value = '';
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage("Failed to update profile");
    }
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
          placeholder={user?.username || "Enter username"}
          type="text"
        />
        <input placeholder={user?.email} type="text" />
        <input onChange={(e) => setAvatar(e.target.files![0])} type="file" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
        {isLoading && <p>Updating profile...</p>}
        {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
        {isError && <p style={{ color: "red" }}>{isError}</p>}
      </form>
    </div>
  );
};

export default Profile;
