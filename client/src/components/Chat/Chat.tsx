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
import {UserModel} from "../../models/user.model";
import DotsIcon from "../../assets/icons/DotsIcon/DotsIcon";
import {TbLogout} from "react-icons/tb"

interface chatProps {
    socket: any
    children?: React.ReactNode
}

interface Message {
    id: string,
    socketId: string,
    username: string,
    message: string,
    timestamp: string,
}

const Chat: React.FC<chatProps> = ({socket}) => {
    const navigate = useNavigate()

    const [message, setMessage] = useState<string>("")
    const [status, setStatus] = useState<string>("")

    const [messages, setMessages] = useState<Message[]>([])
    const [users, setUsers] = useState<UserModel[]>([])

    useEffect(() => {
        socket.on('connectNewUser', (data: any) => setUsers(data))
        localStorage.setItem("users", JSON.stringify(users))
    }, [users, socket])

    useEffect(() => {
        socket.on('disconnected', (data: any) => {
            setUsers(data)
        })
    }, [users, socket])

    useEffect(() => {
        socket.on("response", (data: Message) => {
            setMessages([...messages, data])
        })
    }, [messages, socket])

    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

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

    const handleSendMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (message.trim() && localStorage.getItem("username")) {
            socket.emit("message", {
                id: uuidv4(),
                socketId: socket.id,
                username: localStorage.getItem("username"),
                message,
                timestamp: new Date().toLocaleTimeString("ru-RU", {timeStyle: "short"})
            })
        }
        setMessage("")
    }

    const handleLeave = () => {
        localStorage.removeItem("username")
        socket.emit('disconnectUser', users.find((user) => user.id))
        navigate("/")
    }

    const handleStartTyping = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Backspace" || e.code === "Space") {
            return
        }
        socket.emit('startTyping', `${localStorage.getItem("username")} is typing`)
    }
    const handleEndTyping = () => {
        setTimeout(() => {
            socket.emit('endTyping', "")
        }, 1000)
    }

    useEffect(() => {
        socket.on("responseStartTyping", (data: any) => setStatus(data))
    }, [socket])

    useEffect(() => {
        socket.on("responseEndTyping", (data: any) => setStatus(data))
    }, [socket])

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
                        {users.map((user, index) => {
                            if (user.username === localStorage.getItem("username")) {
                                return <li key={uuidv4()}>(Вы) {user.username}{user && `#${index}`}</li>
                            }
                            return <li key={uuidv4()}>{user.username}{user && `#${index}`}</li>
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
                                    <p>{message.message}</p>
                                    <p className={styles.chat__textfield__log_message_time}>{message.timestamp}</p>
                                </div>
                            )
                            : (
                                <div ref={messageRef} key={message.socketId}
                                     className={styles.chat__textfield__log_message}>
                                    <h4>{message.username}</h4>
                                    <p>{message.message}</p>
                                    <p className={styles.chat__textfield__log_message_time}>{message.timestamp}</p>
                                </div>
                            )
                    })}
                </div>
                <form onSubmit={handleSendMessage} className={styles.chat__textfield__controls}>
                    <Input onKeyup={handleEndTyping} onKeydown={handleStartTyping} value={message}
                           placeholder="Написать..."
                           type="text"
                           onChange={handleMessage}></Input>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;