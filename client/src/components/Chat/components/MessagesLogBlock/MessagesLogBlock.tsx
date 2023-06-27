import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";

import {Message} from "../../../../models/message.model";
import MessageBlock from "../MessageBlock/MessageBlock";
import {useChatStore} from "../../../../store/chat.store";
import {useUserStore} from "../../../../store/user.store";
import {useMessageStore} from "../../../../store/message.store";
import {socket} from "../../../../socket";
import EmptyChatBlock from "../EmptyChatBlock/EmptyChatBlock";

const MessagesLogBlock = () => {
    const {messages, handleNewMessage} = useMessageStore()
    const [connectionAlert, setConnectionAlert] = useState<string>("")
    const {user, users} = useUserStore()

    useEffect(() => {
        socket.on("message:responseMessage", (data: Message) => {
            if (data) {
                handleNewMessage(data)
            }
        })
    }, [socket])

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
            {messages.map((message: Message) => {
                return message.username === user?.username
                    ? (<MessageBlock key={message.id}
                                     view="user"
                                     message={message}

                    />)
                    : (<MessageBlock key={message.id}
                                     view="!user"
                                     message={message}
                        />
                    )
            })}
        </div>
    )
}
export default MessagesLogBlock;