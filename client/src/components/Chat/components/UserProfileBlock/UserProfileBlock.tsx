import React from 'react';
import styles from "./styles.module.scss";

import ProfileIcon from "../../../../assets/icons/ProfileIcon";
import SpeakerIcon from "../../../../assets/icons/SpeakerIcon";
import StatusIcon from "../../../../assets/icons/StatusIcon";
import NewChatIcon from "../../../../assets/icons/NewChatIcon";
import SettingsIcon from "../../../../assets/icons/SettingsIcon";
import {TbLogout} from "react-icons/tb";

import {useChatStore} from "../../../../store/chat.store";
import {useNavigate} from "react-router-dom";

const UserProfileBlock = () => {
    const navigate = useNavigate()

    const {handleLeaveUser} = useChatStore()

    const handleLeaveFromRoom = () => {
        handleLeaveUser()
        navigate("/")
    }

    return <div className={styles.user_profile}>
        <div>
            <button><ProfileIcon/></button>
        </div>
        <div className={styles.user_profile__actions}>
            <button><SpeakerIcon/></button>
            <button><StatusIcon/></button>
            <button><NewChatIcon/></button>
            <button><SettingsIcon/></button>
            <button onClick={handleLeaveFromRoom}><TbLogout size={24} stroke="#54656F"/></button>
        </div>
    </div>
};

export default UserProfileBlock;