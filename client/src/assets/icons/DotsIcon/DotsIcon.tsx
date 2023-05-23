import React from 'react';
import styles from "./styles.module.scss"

const DotsIcon = () => {
    return <svg className={styles.dots} width="132px" height="58px" viewBox="0 0 132 58" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
        <g className={styles.dot1} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="dots" fill="#A3A3A3">
                <circle className={styles.dot1} cx="25" cy="30" r="13"></circle>
                <circle className={styles.dot2} cx="65" cy="30" r="13"></circle>
                <circle className={styles.dot3} cx="105" cy="30" r="13"></circle>
            </g>
        </g>
    </svg>
};

export default DotsIcon;