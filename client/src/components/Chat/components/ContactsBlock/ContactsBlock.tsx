import React from 'react';
import styles from "./styles.module.scss";
import {User} from "../../../../models/user.model";
import {useChatStore} from "../../../../store/chat.store";
import {useUserStore} from "../../../../store/user.store";

const ContactsBlock = () => {
    const {users} = useChatStore()
    console.log(users)
    const {user} = useUserStore()

    return <div className={styles.contacts}>
        <ul>
            {users.map((user: User, index) => {
                return user.username
                    ? <li key={user.id}>(Вы) {user.username}{user && `#${index}`}</li>
                    : <li key={user.id}>{user.username}{user && `#${index}`}</li>
            })}
        </ul>
    </div>
};

export default ContactsBlock;