import React from 'react';
import styles from "./styles.module.scss";

import {User} from "../../../../models/user.model";

import ProfileIcon from "../../../../assets/icons/ProfileIcon";
import {BsPersonFillAdd} from "react-icons/bs"
import {useUserStore} from "../../../../store/user.store";
import { API_URL } from "../../../../config";

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
                <div className={styles.foundUser__main__avatar}>
                    {user?.avatar?.name ? (
                        <img
                            className={styles.user_avatar}
                            src={`${API_URL}/data/uploads/${user.avatar.name}`}
                            alt="avatar"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fallbackElement) {
                                    fallbackElement.classList.remove('hidden');
                                    fallbackElement.style.display = 'flex';
                                }
                            }}
                        />
                    ) : null}
                    <div 
                        className={`${styles.user_avatar_fallback} ${user?.avatar?.name ? 'hidden' : ''}`}
                        style={{ display: user?.avatar?.name ? 'none' : 'flex' }}
                    >
                        <ProfileIcon width="40" height="40" />
                    </div>
                </div>
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