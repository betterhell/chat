import React from 'react';
import styles from "./styles.module.scss";
import ChatImage from "../../../../assets/images/ChatImage";

const EmptyChatBlock = () => {
    return <div className={styles.emptyChat}>
        <ChatImage/>
        <div className={styles.emptyChat__info}>
            <h1>WhatsApp Web</h1>
            <p>Отправляйте и получайте сообщения без необходимости оставлять телефон подключённым.</p>
            <p>Используйте WhatsApp одновременно на четырёх связанных устройствах и одном телефоне.</p>
        </div>
    </div>
};

export default EmptyChatBlock;