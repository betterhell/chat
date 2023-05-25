import React from 'react';
import styles from "./styles.module.scss";

import Input from "../../UI/Input/Input";

import EmojiPicker from "emoji-picker-react";

import {RiMailSendLine as SendMessageIcon} from "react-icons/ri"
import {BsEmojiSmile as EmojiIcon} from "react-icons/bs"

import {useChatStore} from "../../store/chat.store";

interface MessageBoxProps {
    handleStartTyping?: () => void
    handleEndTyping?: () => void
    handleMessage?: () => void
    handleSendMessage?: () => void
}

const MessageBox: React.FC<MessageBoxProps> = (
    {
        handleStartTyping,
        handleEndTyping,
    }) => {

    const {
        message,
        setMessage,
        handleSendMessage,
        onEmojiClick,
        emojiToggle,
        toggleEmojiPicker,
        currentEmoji,
    } = useChatStore()

    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    return (
        <>
            <form onSubmit={handleSendMessage} className={styles.message_box}>
                <Input onKeyup={handleEndTyping} onKeydown={handleStartTyping} value={message}
                       placeholder="Написать..."
                       type="text"
                       onChange={handleMessage}></Input>
                <div className={styles.message_box__controls}>
                    <button type="button" className={styles.message_box__emoji_toggler}
                            onClick={toggleEmojiPicker}>{currentEmoji ? currentEmoji : <EmojiIcon/>}
                    </button>
                    <button className={styles.message_box__send_message} type="submit"><SendMessageIcon/></button>
                </div>
            </form>
            {emojiToggle &&
                <div className={styles.message_box__emoji_picker}><EmojiPicker
                    lazyLoadEmojis={true}
                    onEmojiClick={onEmojiClick}
                    width={300}/>
                </div>
            }
        </>
    );
};

export default MessageBox;