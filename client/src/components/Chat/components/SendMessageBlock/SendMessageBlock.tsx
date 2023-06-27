import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";

import Input from "../../../../UI/Input/Input";

import EmojiPicker, {EmojiClickData} from "emoji-picker-react";

import {RiMailSendLine as SendMessageIcon} from "react-icons/ri"
import {BsEmojiSmile as EmojiIcon} from "react-icons/bs"
import {useReactMediaRecorder} from "react-media-recorder";

import {socket} from "../../../../socket";
import TypingStatus from "../TypingStatusBlock/TypingStatus";
import {useUserStore} from "../../../../store/user.store";
import {useMessageStore} from "../../../../store/message.store"
import {User} from "../../../../models/user.model";

const SendMessageBlock = () => {
    const {message, setMessage, createMessage} = useMessageStore()

    const [emojiToggle, setEmojiToggle] = useState<boolean>(false)
    const [currentEmoji, setCurrentEmoji] = useState<string>("")
    const [typingStatus, setTypingStatus] = useState<string | "">("")

    let timeOutTyping: any = null

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
        setMessage(message.text + emojiData.emoji)
    }

    const handleStartTyping = (e: React.KeyboardEvent<HTMLInputElement>) => {
        clearTimeout(timeOutTyping)
        if (e.code === "Backspace" || e.code === "Space") {
            return
        }
        socket.emit('message:startTyping', `${useUserStore.getState().user?.username} is typing`)
    }

    const handleEndTyping = () => {
        timeOutTyping = setTimeout(() => {
            socket.emit('message:endTyping', null)
        }, 1000)
    }

    useEffect(() => {
        socket.on("message:responseStartTyping", (data: string) => changeTypingStatus(data))
    }, [socket])

    useEffect(() => {
        socket.on("message:responseEndTyping", (data: string) => changeTypingStatus(data))
    }, [socket])

    return (
        <>
            <form onSubmit={handleMessage} className={styles.message_box}>
                <TypingStatus status={typingStatus}/>

                <Input onKeyup={handleEndTyping} onKeydown={handleStartTyping} value={message?.text}
                       placeholder="Написать..."
                       type="text"
                       onChange={changeMessage}/>
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