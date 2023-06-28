import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";
import {User} from "../../../../models/user.model";

import socket from "../../../../socket";
import loader from "../../../../assets/icons/Loader";

const ContactsBlock = () => {
    const [users, setUsers] = useState<[]>([])

    useEffect(() => {
        socket.on('user:responseNewUserList', (data) => setUsers(data));
    }, [socket]);

    return <div className={styles.contacts}>
        <ul>
            {users.map((user: User, index) =>
                <li key={index}>{user.username}</li>
            )}
        </ul>
    </div>
};

export default ContactsBlock;