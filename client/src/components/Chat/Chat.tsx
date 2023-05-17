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
import {useLocation} from "react-router-dom";

interface paramsProps {
    name: string,
    message: string,
}

const Chat = () => {
    const socket = io('http://localhost:5000')

    const {search} = useLocation()
    const [params, setParams] = useState<{} | null>()

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        console.log(searchParams)
        setParams(searchParams)
        socket.emit("join", searchParams)
    }, [search])

    useEffect(() => {
        socket.on('message', ({data}) => {
            console.log(data)
        })
    }, [])

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

                <div className={styles.chat__controls__contacts}></div>
            </div>

            <div className={styles.chat__textfield}>
                {/*<div className={styles.chat__textfield__emptyChat}>*/}
                {/*    <ChatImage/>*/}

                {/*    <div className={styles.chat__textfield__emptyChat_info}>*/}
                {/*        <h1>WhatsApp Web</h1>*/}
                {/*        <p>Отправляйте и получайте сообщения без необходимости оставлять телефон подключённым.</p>*/}
                {/*        <p>Используйте WhatsApp одновременно на четырёх связанных устройствах и одном телефоне.</p>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        </div>
    );
};

export default Chat;