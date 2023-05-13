import React from 'react';
import styles from "./styles.module.scss"
import SignIn from "../../components/SignIn/SignIn";
import Chat from "../../components/Chat/Chat";

const MainPage = () => {
    return (
        <div className={styles.main_page_wrapper}>
            <Chat/>
        </div>
    );
};

export default MainPage;