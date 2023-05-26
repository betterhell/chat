import React from 'react';
import styles from "./styles.module.scss";

import {Message} from "../../../../models/message.model";
import MessageBlock from "../MessageBlock/MessageBlock";
import {useChatStore} from "../../../../store/chat.store";

const MessagesLogBlock = () => {
    const {messages} = useChatStore()

    return <div className={styles.messages_log}>
        {messages.map((message: Message) => {
            return message.username === localStorage.getItem("username")
                ? (<MessageBlock key={message.id}
                                 text={message.text}
                                 view="user"
                                 timestamp={message.timestamp}
                />)
                : (<MessageBlock key={message.id}
                                 text={message.text}
                                 view="!user"
                                 username={message.username}
                                 timestamp={message.timestamp}
                />)
        })}
    </div>
};

export default MessagesLogBlock;