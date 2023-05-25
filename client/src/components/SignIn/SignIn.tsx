import React from 'react';
import styles from "./styles.module.scss"

import {useNavigate} from "react-router-dom";
import {useChatStore} from "../../store/chat.store";

const SignIn = () => {
    const navigate = useNavigate()

    const {user, handleUsernameChange, handleUserSubmit} = useChatStore()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleUserSubmit()
        navigate(`/chat`)
    }

    return (
        <div className={styles.sign_in}>
            <form onSubmit={handleSubmit}>
                <h1>Войти</h1>
                <div className={styles.sign_in__id}>
                    <label htmlFor="nickname">
                        Nickname
                    </label>
                    <input value={user}
                           onChange={handleUsernameChange}
                           required={true}
                           autoComplete="off"
                           placeholder="You'r fking nickname"
                           name="nickname"
                           type="text"/>
                </div>
                <button>Войти</button>
            </form>
        </div>
    );
};

export default SignIn;