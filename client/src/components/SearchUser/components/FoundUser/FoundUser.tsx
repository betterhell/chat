import React from 'react';
import styles from "./styles.module.scss";

import {User} from "../../../../models/user.model";

import ProfileIcon from "../../../../assets/icons/ProfileIcon";
import {BsPersonFillAdd} from "react-icons/bs"
import {useUserStore} from "../../../../store/user.store";

interface FoundUserProps {
    user: User
}

const FoundUser: React.FC<FoundUserProps> = ({user}) => {
    const {addToFriends} = useUserStore()

    const addFriend = () => {
        addToFriends(user)
    }

    return (
        <div onClick={addFriend} className={styles.foundUser}>
            <div className={styles.foundUser__main}>
                <div className={styles.foundUser__main__avatar}><ProfileIcon/></div>
                <div className={styles.foundUser__main__info}>
                    <h3>{user?.username}</h3>
                </div>
            </div>
            <div className={styles.foundUser__action}>
                <button><BsPersonFillAdd color="#54656F" size={25}/></button>
            </div>
        </div>
    );
};

export default FoundUser;