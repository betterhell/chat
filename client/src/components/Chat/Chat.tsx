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
import {User} from "../../models/user.model";
import DotsIcon from "../../assets/icons/DotsIcon/DotsIcon";
import {TbLogout} from "react-icons/tb"
import MessageBox from "../MessageBox/MessageBox";
import {useChatStore} from "../../store/chat.store";
import {Message} from "../../models/message.model";
import {socket} from "../../socket";


interface chatProps {
    children?: React.ReactNode
}

const Chat: React.FC<chatProps> = () => {
    const navigate = useNavigate()

    const {
        users,
        messages,
        handleConnectNewUser,
        handleDisconnectUser,
        handleNewMessage,
        handleLeaveUser,
        typingStatus,
    } = useChatStore()


    useEffect(() => {
        socket.on("connectNewUser", (data: User) => {
            handleConnectNewUser(data)
        })
    }, [socket])

    useEffect(() => {
        socket.on("disconnected", (data: User) => {
            handleDisconnectUser(data)
        })
    }, [socket])

    useEffect(() => {
        socket.on("response", (data: Message) => {
            if (data) {
                handleNewMessage(data)
            }
        })
    }, [socket])

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

    const handleLeave = () => {
        handleLeaveUser()
        navigate("/")
    }

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
                        <button onClick={handleLeave}><TbLogout size={24} stroke="#54656F"/></button>
                    </div>

                </div>

                <div className={styles.chat__controls__searchInput}>
                    <Input placeholder="Введите ник" type="text"/>
                    <button><FilterIcon/></button>
                </div>

                <div className={styles.chat__controls__contacts}>
                    <ul>
                        {users.map((user: User, index) => {
                            return user.username === localStorage.getItem("username")
                                ? <li key={user.id}>(Вы) {user.username}{user && `#${index}`}</li>
                                : <li key={user.id}>{user.username}{user && `#${index}`}</li>
                        })}
                    </ul>
                </div>
            </div>

            <div className={styles.chat__textfield}>
                <div className={styles.chat__textfield__typingStatus}>
                    {typingStatus && <p>{typingStatus} <DotsIcon/></p>}
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
                                <div ref={messageRef} key={message.id}
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