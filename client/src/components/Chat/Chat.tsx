import React, {useEffect} from 'react';
import styles from "./styles.module.scss"

import {User} from "../../models/user.model";
import {Message} from "../../models/message.model";
import {useChatStore} from "../../store/chat.store";

import {socket} from "../../socket";

import SendMessageBlock from "./components/SendMessageBlock/SendMessageBlock";
import MessagesLogBlock from "./components/MessagesLogBlock/MessagesLogBlock";
import UserProfileBlock from "./components/UserProfileBlock/UserProfileBlock";
import ContactsBlock from "./components/ContactsBlock/ContactsBlock";

const Chat = () => {
    const {handleConnectNewUser, handleDisconnectUser, handleNewMessage} = useChatStore()

    useEffect(() => {
        socket.on("connectNewUser", (data: User) => {
            handleConnectNewUser(data)
        })
    }, [socket])

    useEffect(() => {
        socket.on("disconnected", (data: User) => {
            handleDisconnectUser(data)
        })
    }, [socket])

    useEffect(() => {
        socket.on("response", (data: Message) => {
            if (data) {
                handleNewMessage(data)
            }
        })
    }, [socket])

    return (
        <div className={styles.chat}>
            <div className={styles.chat__aside}>
                <UserProfileBlock/>
                <ContactsBlock/>
            </div>

            <div className={styles.chat__main}>
                <MessagesLogBlock/>
                <SendMessageBlock/>
            </div>
        </div>
    );
};

export default Chat;