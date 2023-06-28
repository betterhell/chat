import React, {useState} from 'react';
import styles from "./styles.module.scss"

import SendMessageBlock from "./components/SendMessageBlock/SendMessageBlock";
import MessagesLogBlock from "./components/MessagesLogBlock/MessagesLogBlock";
import UserProfileBlock from "./components/UserProfileBlock/UserProfileBlock";
import ContactsBlock from "./components/ContactsBlock/ContactsBlock";
import SearchUser from "../SearchUser/SearchUser";
import EmptyChatBlock from "./components/EmptyChatBlock/EmptyChatBlock";
import {useUserStore} from "../../store/user.store";

const Chat = () => {
    const [currentUser, setCurrentUser] = useState<boolean>(false)
    const {foundUser} = useUserStore()

    const toggleChat = () => {
        setCurrentUser(!currentUser)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.chat}>
                <div className={styles.chat__aside}>
                    <UserProfileBlock/>
                    <SearchUser toggleChat={toggleChat}/>
                    <ContactsBlock/>
                </div>

                <div className={styles.chat__main}>
                    {/*{currentUser*/}
                    {/*    ?*/}
                    {/*    <>*/}
                    {/*        <MessagesLogBlock/>*/}
                    {/*        <SendMessageBlock/>*/}
                    {/*    </>*/}
                    {/*    : <EmptyChatBlock/>*/}
                    {/*}*/}
                    <MessagesLogBlock/>
                    <SendMessageBlock/>
                </div>
            </div>
        </div>
    );
};

export default Chat;