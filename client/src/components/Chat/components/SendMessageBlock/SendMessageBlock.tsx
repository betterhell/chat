import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";

import Input from "../../../../UI/Input/Input";

import EmojiPicker, {EmojiClickData} from "emoji-picker-react";

import {RiMailSendLine as SendMessageIcon} from "react-icons/ri"
import {BsEmojiSmile as EmojiIcon} from "react-icons/bs"

import {socket} from "../../../../socket";
import TypingStatus from "../TypingStatusBlock/TypingStatus";
import {useUserStore} from "../../../../store/user.store";
import {useMessageStore} from "../../../../store/message.store"


const SendMessageBlock = () => {
    const {message, setMessage, createMessage} = useMessageStore()

    const [emojiToggle, setEmojiToggle] = useState<boolean>(false)
    const [currentEmoji, setCurrentEmoji] = useState<string>("")
    const [typingStatus, setTypingStatus] = useState<string | "">("")


    const changeTypingStatus = (data: string) => {
        setTypingStatus(data)
    }

    const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        createMessage(message)
    }

    const toggleEmojiPicker = () => {
        setEmojiToggle(!emojiToggle)
    }

    const onEmojiClick = (emojiData: EmojiClickData, e: MouseEvent) => {
        e.stopPropagation()
        setCurrentEmoji(emojiData.emoji)
        setMessage(message + emojiData.emoji)
    }

    const handleStartTyping = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Backspace" || e.code === "Space") {
            return
        }
        socket.emit('startTyping', `${useUserStore.getState().user.username} is typing`)
    }

    const handleEndTyping = () => {
        setTimeout(() => {
            socket.emit('endTyping', null)
        }, 1000)
    }

    useEffect(() => {
        socket.on("responseStartTyping", (data: string) => changeTypingStatus(data))
    }, [socket])

    useEffect(() => {
        socket.on("responseEndTyping", (data: string) => changeTypingStatus(data))
    }, [socket])

    return (
        <>
            <form onSubmit={handleMessage} className={styles.message_box}>
                <TypingStatus status={typingStatus}/>

                <Input onKeyup={handleEndTyping} onKeydown={handleStartTyping} value={message}
                       placeholder="Написать..."
                       type="text"
                       onChange={changeMessage}></Input>
                <div className={styles.message_box__controls}>
                    <button type="button" className={styles.message_box__emoji_toggler}
                            onClick={toggleEmojiPicker}>{currentEmoji ? currentEmoji : <EmojiIcon/>}
                    </button>
                    <button className={styles.message_box__send_message} type="submit"><SendMessageIcon/></button>
                </div>
            </form>
            {emojiToggle &&
                <div className={styles.message_box__emoji_picker}>
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width={300}
                    />
                </div>
            }
        </>
    );
};

export default SendMessageBlock;