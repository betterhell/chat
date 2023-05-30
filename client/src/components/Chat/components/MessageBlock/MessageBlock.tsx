import React, {useEffect, useRef} from 'react';
import styles from "./styles.module.scss";
import {v4 as uuidv4} from "uuid";

interface UserMessageBlockProps {
    view: string
    username?: string
    text: string,
    timestamp: string
}

const MessageBlock: React.FC<UserMessageBlockProps> = ({view, username, text, timestamp}) => {

    const messageRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                })
        }
    })
    return (
        <>
            {view === "user" ?
                <div ref={messageRef} key={uuidv4()}
                     className={styles.user_message}>
                    <p>{text}</p>
                    <p className={styles.timestamp}>{timestamp}</p>
                </div>
                :
                <div ref={messageRef} key={uuidv4()}
                     className={styles.other_message}>
                    <h4>{username}</h4>
                    <p>{text}</p>
                    <p className={styles.timestamp}>{timestamp}</p>
                </div>
            }

        </>
    );
};

export default MessageBlock;