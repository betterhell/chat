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
                return user.username
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
                        />
                    )
            })}
            {/*    :*/}
            {/*    (<div className={styles.chat__textfield__emptyChat}>*/}
            {/*        <ChatImage/>*/}
            {/*        <div className={styles.chat__textfield__emptyChat_info}>*/}
            {/*            <h1>WhatsApp Web</h1>*/}
            {/*            <p>Отправляйте и получайте сообщения без необходимости оставлять телефон подключённым.</p>*/}
            {/*            <p>Используйте WhatsApp одновременно на четырёх связанных устройствах и одном телефоне.</p>*/}
            {/*        </div>*/}
            {/*    </div>)*/}
            {/*}*/}
        </div>
    )
}
export default MessagesLogBlock;