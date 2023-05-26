import React from 'react';
import styles from "./styles.module.scss";

const Hamburger = () => {
    return <button className={`${styles.hamburger} ${styles.hamburger__arrowturn} ${styles.isActive}`} type="button">
            <span className={styles.hamburger_box}>
            <span className={styles.hamburger_inner}></span>
            </span>
    </button>
};

export default Hamburger;