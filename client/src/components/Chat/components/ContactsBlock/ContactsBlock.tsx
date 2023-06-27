import React, {useEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss";
import {User} from "../../../../models/user.model";
import {useChatStore} from "../../../../store/chat.store";
import {useUserStore} from "../../../../store/user.store";

import {socket} from "../../../../socket";
import loader from "../../../../assets/icons/Loader";

const ContactsBlock = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        socket.on("user:responseConnect", (user) => {
            setUsers(prevState => [...prevState, user])
        })
    }, [socket])

    useEffect(() => {
        socket.on("user:responseDisconnect", ((leavingUser) => {
            const newUserList = users.filter((user: User) => user.id !== leavingUser._id)
            setUsers(newUserList)
        }))
    }, [socket])

    return <div className={styles.contacts}>
        <ul>
            {users.map((user: User, index) =>
                <li key={index}>{user.username}</li>
            )}
        </ul>
    </div>
};

export default ContactsBlock;