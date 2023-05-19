import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss"

import ProfileIcon from "../../assets/icons/ProfileIcon";
import SpeakerIcon from "../../assets/icons/SpeakerIcon";
import StatusIcon from "../../assets/icons/StatusIcon";
import NewChatIcon from "../../assets/icons/NewChatIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import io from "socket.io-client";
import ChatImage from "../../assets/images/ChatImage";
import Input from "../../UI/Input/Input";
import FilterIcon from "../../assets/icons/FilterIcon";

import {useUserStore} from "../../store/user.store";
import {useLocation, useNavigate} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

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

const Chat: React.FC<chatProps> = ({socket, children}) => {
    const navigate = useNavigate()

    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        socket.on("response", (data: Message) => {
            setMessages([...messages, data])
        })

    }, [messages])


    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

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
        localStorage.removeItem("room")
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
                    </div>

                </div>
                {/*<div className={styles.chat__controls__searchInput}>*/}
                {/*    <Input value={phone} onChange={userPhoneChange} placeholder="Введите номер" type="number"/>*/}
                {/*    <button onClick={sendMessage}><FilterIcon/></button>*/}
                {/*</div>*/}

                <div className={styles.chat__controls__contacts}>
                    <ul>
                        <li>User 1</li>
                        <li>User 23</li>
                        <li>User 235</li>
                    </ul>
                </div>
            </div>

            <div className={styles.chat__textfield}>
                <div className={styles.chat__textfield__log}>
                    <button onClick={handleLeave}>Leave chat</button>
                    {messages.map((message: Message) => {
                        return message.username === localStorage.getItem("username")
                            ? (
                                <div key={message.id} className={styles.chat__textfield__log_youMessage}>
                                    <p>{message.message}</p>
                                    <p className={styles.chat__textfield__log_message_time}>{message.timestamp}</p>
                                </div>
                            )
                            : (
                                <div key={message.socketId} className={styles.chat__textfield__log_message}>
                                    <h4>{message.username}</h4>
                                    <p>{message.message}</p>
                                    <p className={styles.chat__textfield__log_message_time}>{message.timestamp}</p>
                                </div>
                            )
                    })}
                </div>
                <form onSubmit={handleSendMessage} className={styles.chat__textfield__controls}>
                    <Input value={message} placeholder="Написать..." type="text" onChange={handleMessage}></Input>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;