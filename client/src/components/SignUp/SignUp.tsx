import React from 'react';
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";
import axios from "axios";

import {useUserStore} from "../../store/user.store";

const SignUp = () => {
    const {username, email, password} = useUserStore()
    const {handleChangeUsername, handleChangeEmail, handleChangePassword} = useUserStore()

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await axios.post("http://localhost:5000/sign-up", {
            username,
            email,
            password,
        }).then(({data}) => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.sign_up}>
                <form onSubmit={register}>
                    <h1>Sign Up</h1>
                    <div className={styles.sign_up__id}>
                        <label htmlFor="nickname">
                            Nickname
                        </label>
                        <input
                            value={username}
                            onChange={handleChangeUsername}
                            required={true}
                            autoComplete="off"
                            placeholder="Enter your nickname"
                            name="nickname"
                            type="text"/>
                    </div>
                    <div className={styles.sign_up__id}>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={handleChangeEmail}
                            required={true}
                            autoComplete="off"
                            placeholder="Enter your email"
                            name="email"
                            type="email"/>
                    </div>
                    <div className={styles.sign_up__id}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={handleChangePassword}
                            required={true}
                            autoComplete="off"
                            placeholder="Enter your password"
                            name="password"
                            type="password"/>
                    </div>
                    <p><Link to="/sign-in">Registered yet?</Link></p>
                    <button>Register</button>
                </form>
            </div>
        </div>
    )
};

export default SignUp;