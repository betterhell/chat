import React from "react";
import styles from "./styles.module.scss";
import ProfileIcon from "../../../../../assets/icons/ProfileIcon";
import { User } from "../../../../../models/user.model";

interface ContactUserProps {
  user: User;
}

const ContactUser: React.FC<ContactUserProps> = ({ user }) => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>
        <ProfileIcon height="40" width="40" />
      </div>
      <div className={styles.username}>
        <h3>{user.username}</h3>
      </div>
    </div>
  );
};

export default ContactUser;
