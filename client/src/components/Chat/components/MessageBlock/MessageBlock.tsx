import React, {useEffect, useRef} from 'react';
import styles from "./styles.module.scss";

interface UserMessageBlockProps {
    view: string
    message: any
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
    }, [message])

    return (
        <>
            {view === "user" ?
                <div ref={messageRef} key={message._id} className={styles.user_message}>
                    <p>{message.text}</p>
                    <p className={styles.timestamp}>{message.timestamp}</p>
                </div>
                :
                <div ref={messageRef} key={message._id} className={styles.other_message}>
                    <h4>{message.username}</h4>
                    <p>{message.text}</p>
                    <p className={styles.timestamp}>{message.timestamp}</p>
                </div>
            }

        </>
    );
};

export default MessageBlock;