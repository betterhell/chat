import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";

import {Message} from "../../../../models/message.model";
import MessageBlock from "../MessageBlock/MessageBlock";

import {useUserStore} from "../../../../store/user.store";
import {useMessageStore} from "../../../../store/message.store";

import socket from "../../../../socket";

const MessagesLogBlock = () => {
    const [connectionAlert, setConnectionAlert] = useState<string>("")

    const {messages, handleNewMessage, fetchMessages} = useMessageStore()
    const {user} = useUserStore()

    useEffect(() => {
        socket.on("message:responseMessage", (data: Message) => {
            if (data) {
                handleNewMessage(data)
            }
        })
    }, [])

    useEffect(() => {
        fetchMessages()
    }, [fetchMessages])

    useEffect(() => {
        socket.on("user:responseConnectMessage", (data) => {
            setConnectionAlert(data)
        })
    }, [])

    useEffect(() => {
        socket.on("user:responseDisconnectMessage", (data) => {
            setConnectionAlert(data)
        })
    }, [])

    return (
        <div className={styles.messages_log}>
            <p className={styles.connectionAlert}>{connectionAlert}</p>
            {messages.map((message) => {
                return user?._id === message.userId
                    ? <MessageBlock key={message._id}
                                    view="user"
                                    message={message}
                    />
                    : <MessageBlock key={message._id}
                                    view="!user"
                                    message={message}
                    />
            })}
        </div>
    )
}
export default MessagesLogBlock;