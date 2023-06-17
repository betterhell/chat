import React from 'react';
import styles from "./styles.module.scss";

import {Message} from "../../../../models/message.model";
import MessageBlock from "../MessageBlock/MessageBlock";
import {useChatStore} from "../../../../store/chat.store";
import {useUserStore} from "../../../../store/user.store";

const MessagesLogBlock = () => {
    const {messages} = useChatStore()
    const {user} = useUserStore()

    return (
        <div className={styles.messages_log}>
            {messages.map((message: Message) => {
                return message.username === user.username
                    ? (<MessageBlock key={message.id}
                                     text={message.message}
                                     view="user"
                                     timestamp={message.timestamp}
                    />)
                    : (<MessageBlock key={message.id}
                                     text={message.message}
                                     view="!user"
                                     username={message.username}
                                     timestamp={message.timestamp}
                        />
                    )
            })}
        </div>
    )
}
export default MessagesLogBlock;