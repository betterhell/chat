import React, {useEffect, useRef} from 'react';
import styles from "./styles.module.scss";

interface UserMessageBlockProps {
    view: string
    message: import("../../../../models/message.model").Message
}

const MessageBlock: React.FC<UserMessageBlockProps> = ({view, message}) => {

    return (
        <>
            {view === "user" ?
                <div key={message._id} className={styles.user_message}>
                    <p>{message.text}</p>
                    <p className={styles.timestamp}>{message.timestamp}</p>
                </div>
                :
                <div key={message._id} className={styles.other_message}>
                    <h4>{message.username}</h4>
                    <p>{message.text}</p>
                    <p className={styles.timestamp}>{message.timestamp}</p>
                </div>
            }

        </>
    );
};

export default MessageBlock;