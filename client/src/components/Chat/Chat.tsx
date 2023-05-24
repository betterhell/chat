import React, {useEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss"

import ProfileIcon from "../../assets/icons/ProfileIcon";
import SpeakerIcon from "../../assets/icons/SpeakerIcon";
import StatusIcon from "../../assets/icons/StatusIcon";
import NewChatIcon from "../../assets/icons/NewChatIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";

import Input from "../../UI/Input/Input";
import FilterIcon from "../../assets/icons/FilterIcon";

import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import {User} from "../../models/user.model";
import DotsIcon from "../../assets/icons/DotsIcon/DotsIcon";
import {TbLogout} from "react-icons/tb"
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import MessageBox from "../MessageBox/MessageBox";
import {useChatStore} from "../../store/chat.store";
import {Message} from "../../models/message.model";
import {io} from "socket.io-client";

const socket = io("http://localhost:5000")

interface chatProps {

    children?: React.ReactNode
}

const Chat: React.FC<chatProps> = () => {
    const navigate = useNavigate()

    const {
        users,
        messages,
        handleNewUser,
        handleDisconnectUser,
        handleNewMessage
    } = useChatStore(state => state)

    const [status, setStatus] = useState<string>("")

    const [emojiPicker, setEmojiPicker] = useState<boolean>(false)
    const [currentEmoji, setCurrentEmoji] = useState<React.ReactNode | null>(null)


    useEffect(() => {
        handleNewUser()
    }, [handleNewUser])

    useEffect(() => {
        handleDisconnectUser()
    }, [handleDisconnectUser])

    useEffect(() => {
        handleNewMessage()
    }, [handleNewMessage])

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

    // const handleLeave = () => {
    //     localStorage.removeItem("username")
    //     socket.emit('disconnectUser', users?.find((user) => user.id))
    //     navigate("/")
    // }
    //
    // const handleStartTyping = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.code === "Backspace" || e.code === "Space") {
    //         return
    //     }
    //     socket.emit('startTyping', `${localStorage.getItem("username")} is typing`)
    // }
    // const handleEndTyping = () => {
    //     setTimeout(() => {
    //         socket.emit('endTyping', "")
    //     }, 1000)
    // }
    //
    // useEffect(() => {
    //     socket.on("responseStartTyping", (data: any) => setStatus(data))
    // }, [socket])
    //
    // useEffect(() => {
    //     socket.on("responseEndTyping", (data: any) => setStatus(data))
    // }, [socket])

    const toggleEmojiPicker = () => {
        setEmojiPicker(!emojiPicker)
    }

    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        setCurrentEmoji(emojiData.emoji)
        // setMessage(emojiData.emoji)
        setEmojiPicker(false)
    };

    return (
        <div className={styles.chat}>
            <div className={styles.chat__controls}>
                <div className={styles.chat__controls__profile}>
                    <div>
                        <button><ProfileIcon/></button>
                    </div>
                    <div className={styles.chat__controls__profile_actions}>
                        <button><SpeakerIcon/></button>
                        <button><StatusIcon/></button>
                        <button><NewChatIcon/></button>
                        <button><SettingsIcon/></button>
                        <button><TbLogout size={24} stroke="#54656F"/></button>
                    </div>

                </div>
                <div className={styles.chat__controls__searchInput}>
                    <Input placeholder="Введите ник" type="text"/>
                    <button><FilterIcon/></button>
                </div>

                <div className={styles.chat__controls__contacts}>
                    <ul>
                        {users.map((user: User) => {
                            if (user.username === localStorage.getItem("username")) {
                                return <li key={user.id}>(Вы) {user.username}{user && `#${user.id}`}</li>
                            }
                            return <li key={user.id}>{user.username}{user && `#${user.id}`}</li>
                        })}
                    </ul>
                </div>
            </div>

            <div className={styles.chat__textfield}>
                <div className={styles.chat__textfield__typingStatus}>
                    {status && <p>{status} <DotsIcon/></p>}
                </div>
                <div className={styles.chat__textfield__log}>
                    {messages.map((message: Message) => {
                        return message.username === localStorage.getItem("username")
                            ? (
                                <div ref={messageRef} key={message.id}
                                     className={styles.chat__textfield__log_youMessage}>
                                    <p>{message.text}</p>
                                    <p className={styles.chat__textfield__log_message_time}>{message.timestamp}</p>
                                </div>
                            )
                            : (
                                <div ref={messageRef} key={message.socketId}
                                     className={styles.chat__textfield__log_message}>
                                    <h4>{message.username}</h4>
                                    <p>{message.text}</p>
                                    <p className={styles.chat__textfield__log_message_time}>{message.timestamp}</p>
                                </div>
                            )
                    })}
                </div>
                <MessageBox/>
            </div>
        </div>
    );
};

export default Chat;