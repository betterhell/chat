import React, {useEffect, useRef} from 'react';
import styles from "./styles.module.scss";
import {v4 as uuidv4} from "uuid";
import {Message} from "../../../../models/message.model";

interface UserMessageBlockProps {
    view: string
    message: Message
}

const MessageBlock: React.FC<UserMessageBlockProps> = ({view, message}) => {

    const messageRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: "end",
                    inline: 'end'
                })
        }
    })

    return (
        <>
            {view === "user" ?
                <div ref={messageRef} key={uuidv4()}
                     className={styles.user_message}>
                    <p>{message.text}</p>
                    <p className={styles.timestamp}>{message.timestamp}</p>
                </div>
                :
                <div ref={messageRef} key={uuidv4()}
                     className={styles.other_message}>
                    <h4>{message.username}</h4>
                    {message.text.startsWith("blob") ? <audio src={message.text} controls/> : <p>{message.text}</p>}
                    <p className={styles.timestamp}>{message.timestamp}</p>
                </div>
            }

        </>
    );
};

export default MessageBlock;