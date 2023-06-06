import React from 'react';
import {Link} from 'react-router-dom';
import styles from "./styles.module.scss"

const Main = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.context}>
                <h1><Link to="/login">Welcome to the CHAT!</Link></h1>
            </div>

            <div className={styles.area}>
                <ul className={styles.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    );
};

export default Main;