import React from "react";
import styles from "./styles.module.scss";
import { User } from "../../../../models/user.model";

interface ContactsBlockProps {
  users: User[];
}

const ContactsBlock: React.FC<ContactsBlockProps> = ({ users }) => {
  return (
    <div className={styles.contacts}>
      <ul>
        {users.map((user: User, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsBlock;
