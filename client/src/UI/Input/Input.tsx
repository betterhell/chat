import React from 'react';
import styles from "./styles.module.scss"

interface InputProps {
    placeholder: string
    type: "text" | "password" | "number"
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({placeholder, type, value, onChange}) => {
    return <input value={value} onChange={onChange} className={styles.input} placeholder={placeholder} type={type}/>
};

export default Input;