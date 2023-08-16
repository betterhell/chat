import React from 'react';
import styles from "./styles.module.scss"
import {useUserStore} from "../../store/user.store";

const Error = () => {
    const {isError} = useUserStore()

    return isError ? <p className={styles.error}>{isError}</p> : null
};

export default Error;