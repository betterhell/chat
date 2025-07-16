import React from "react";
import styles from "./styles.module.scss";
import { User } from "@/models/user.model";

import ContactUser from "./ContactUser/ContactUser";

interface ContactsBlockProps {
  users: User[];
}

const ContactsBlock: React.FC<ContactsBlockProps> = ({ users }) => {
  return (
    <div className={styles.contacts}>
      <ul>
        {users.map((user: User) => (
          <ContactUser user={user} key={user._id} />
        ))}
      </ul>
    </div>
  );
};

export default ContactsBlock;
