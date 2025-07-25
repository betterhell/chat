import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";

import { Message } from "@/models/message.model";
import MessageBlock from "../MessageBlock/MessageBlock";

import { useUserStore } from "@/store/user.store";
import { useMessageStore } from "@/store/message.store";
import socket from "@/socket";

const MessagesLogBlock = () => {
  const [connectionAlert, setConnectionAlert] = useState<string>("");
  const spacerRef = useRef<HTMLDivElement | null>(null);

  const { messages, handleNewMessage, fetchMessages } = useMessageStore();
  const { user } = useUserStore();

  useEffect(() => {
    socket.on("message:responseMessage", (message: Message) => {
      handleNewMessage(message);
    });
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    socket.on("user:responseConnectMessage", (data) => {
      setConnectionAlert(data);
    });
  }, []);

  useEffect(() => {
    socket.on("user:responseDisconnectMessage", (data) => {
      setConnectionAlert(data);
    });
  }, []);

  useEffect(() => {
    if (spacerRef.current) {
      spacerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className={styles.messages_log}>
      <p className={styles.connectionAlert}>{connectionAlert}</p>
      {messages.map((message) => {
        return user?._id === message.userId ? (
          <MessageBlock key={message._id} view="user" message={message} />
        ) : (
          <MessageBlock key={message._id} view="!user" message={message} />
        );
      })}
      <div className={styles.bottomSpacer} ref={spacerRef} />
    </div>
  );
};
export default MessagesLogBlock;
