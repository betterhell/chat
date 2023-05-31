import React from 'react';
import styles from "./styles.module.scss"

import {Link, useNavigate} from "react-router-dom";
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
        <div className={styles.wrapper}>
            <div className={styles.sign_in}>
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className={styles.sign_in__id}>
                        <label htmlFor="nickname">
                            Nickname
                        </label>
                        <input value={user}
                               onChange={handleUsernameChange}
                               required={true}
                               autoComplete="off"
                               placeholder="Enter your nickname"
                               name="nickname"
                               type="text"/>
                    </div>
                    <div className={styles.sign_in__id}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input value={user}
                               onChange={handleUsernameChange}
                               required={true}
                               autoComplete="off"
                               placeholder="Enter your password"
                               name="nickname"
                               type="text"/>
                    </div>
                    <p><Link to="/signup">Not registered yet?</Link></p>
                    <button>Войти</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;