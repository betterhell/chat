import React from 'react';
import styles from "./styles.module.scss"

interface InputProps {
    placeholder: string
    type: "text" | "password"
}

const Input: React.FC<InputProps> = ({placeholder, type}) => {
    return <input className={styles.input} placeholder={placeholder} type={type}/>
};

export default Input;