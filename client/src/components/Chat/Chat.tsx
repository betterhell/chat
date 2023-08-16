import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import SendMessageBlock from "./components/SendMessageBlock/SendMessageBlock";
import MessagesLogBlock from "./components/MessagesLogBlock/MessagesLogBlock";
import UserProfileBlock from "./components/UserProfileBlock/UserProfileBlock";
import ContactsBlock from "./components/ContactsBlock/ContactsBlock";
import SearchUser from "../SearchUser/SearchUser";
import { User } from "../../models/user.model";
import socket from "../../socket";
import { useUserStore } from "../../store/user.store";

const Chat = () => {
  const { user } = useUserStore();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("user:responseUsers", (users) => {
      setUsers(users);
    });

    return () => {
      socket.off("user:responseUsers");
    };
  }, [socket]);

  useEffect(() => {
    socket.connect();

    if (user) {
      socket.emit("user:connect", user);
    }
    return () => {
      socket.off("user:connect");
    };
  }, [socket, user]);

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
