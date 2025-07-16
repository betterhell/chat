import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import SendMessageBlock from "./components/SendMessageBlock/SendMessageBlock";
import MessagesLogBlock from "./components/MessagesLogBlock/MessagesLogBlock";
import UserProfileBlock from "./components/UserProfileBlock/UserProfileBlock";
import ContactsBlock from "./components/ContactsBlock/ContactsBlock";
import SearchUser from "@/components/SearchUser/SearchUser";
import Hamburger from "@/UI/Hamburger/Hamburger";
import { User } from "@/models/user.model";
import socket from "@/socket";
import { useUserStore } from "@/store/user.store";

const Chat = () => {
  const { user } = useUserStore();
  const [users, setUsers] = useState<User[]>([]);
  const [asideOpen, setAsideOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUsers(prevUsers => {
        const userIndex = prevUsers.findIndex(u => u._id === user._id);
        if (userIndex !== -1) {
          const updatedUsers = [...prevUsers];
          updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...user };
          return updatedUsers;
        }
        return prevUsers;
      });
    }
  }, [user]);

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

        <div className={styles.hamburgerWrapper}>
          <Hamburger onClick={() => setAsideOpen(true)} isActive={asideOpen} />
        </div>

        {asideOpen && (
          <div
            className={styles.menuOverlay}
            onClick={() => setAsideOpen(false)}
            aria-label="Закрыть меню"
          />
        )}

        <div
          className={styles.chat__aside + (asideOpen ? ' ' + styles.open : '')}
        >
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
