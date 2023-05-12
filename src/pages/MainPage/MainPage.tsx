import React from 'react';
import styles from "./styles.module.scss"
import SignIn from "../../components/SignIn/SignIn";

const MainPage = () => {
    return (
        <div className={styles.main_page_wrapper}>
            <SignIn />
        </div>
    );
};

export default MainPage;