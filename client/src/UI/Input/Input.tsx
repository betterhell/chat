import React from 'react';
import styles from "./styles.module.scss"
import {Message} from "../../models/message.model";

interface InputProps {
    placeholder: string
    type: "text" | "password" | "number"
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyup?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({placeholder, type, value, onChange, onKeydown, onKeyup}) => {
    return <input onKeyUp={onKeyup} onKeyDown={onKeydown}
                  value={value}
                  onChange={onChange}
                  className={styles.input}
                  placeholder={placeholder} type={type}
    />
};

export default Input;