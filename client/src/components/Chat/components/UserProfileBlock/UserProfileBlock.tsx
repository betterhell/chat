import React, {useState} from 'react';
import styles from "./styles.module.scss";

import ProfileIcon from "../../../../assets/icons/ProfileIcon";
import SpeakerIcon from "../../../../assets/icons/SpeakerIcon";
import StatusIcon from "../../../../assets/icons/StatusIcon";
import NewChatIcon from "../../../../assets/icons/NewChatIcon";
import SettingsIcon from "../../../../assets/icons/SettingsIcon";

import {TbLogout} from "react-icons/tb";

import {useNavigate} from "react-router-dom";
import Profile from "../../../Profile/Profile";

import {useUserStore} from "../../../../store/user.store";
import SearchUser from "../../../SearchUser/SearchUser";

const UserProfileBlock = () => {
    const navigate = useNavigate()

    const [profileActive, setProfileActive] = useState<boolean>(false)

    const {user, logout} = useUserStore()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const toggleProfile = () => {
        setProfileActive(!profileActive)
    }

    return <div className={styles.user_profile}>
        <div className={styles.user_profile__info}>
            <button onClick={toggleProfile}><ProfileIcon/></button>
            <h3>{user?.username}</h3>
        </div>
        <div className={styles.user_profile__actions}>
            <button><SpeakerIcon/></button>
            <button><StatusIcon/></button>
            <button><NewChatIcon/></button>
            <button><SettingsIcon/></button>
            <button onClick={handleLogout}><TbLogout size={24} stroke="#54656F"/></button>
        </div>
        {profileActive ? <Profile isActive={profileActive}/> : <Profile isActive={profileActive}/>}
    </div>
};

export default UserProfileBlock;