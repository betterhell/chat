import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import SendMessageBlock from "./components/SendMessageBlock/SendMessageBlock";
import MessagesLogBlock from "./components/MessagesLogBlock/MessagesLogBlock";
import UserProfileBlock from "./components/UserProfileBlock/UserProfileBlock";
import ContactsBlock from "./components/ContactsBlock/ContactsBlock";
import SearchUser from "../SearchUser/SearchUser";
import { User } from "../../models/user.model";

interface chatProps {
  users: User[];
}

const Chat: React.FC<chatProps> = ({ users }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chat}>
        <div className={styles.chat__aside}>
          <UserProfileBlock />
          <SearchUser />
          <ContactsBlock users={users} />
        </div>

        <div className={styles.chat__main}>
          <MessagesLogBlock />
          <SendMessageBlock />
        </div>
      </div>
    </div>
  );
};

export default Chat;
