import React from 'react';
import styles from "./styles.module.scss"

import {Link, useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/user.store";
import axios from "axios";

const SignIn = () => {
    const navigate = useNavigate()

    const {email, password, isError} = useUserStore()
    const {handleChangeEmail, handleChangePassword, handleIsError} = useUserStore()

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await axios.post("http://localhost:5000/sign-in", {
            email,
            password,
        }).then(({data}) => {
            console.log(data)
        }).catch(error => {
            handleIsError(error.response.data.error, error.response.status)
        })
    }

    console.log(isError)
    return (
        <div className={styles.wrapper}>
            <div className={styles.sign_in}>
                <form onSubmit={login}>
                    <h1>Sign In</h1>
                    <div className={styles.sign_in__id}>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input value={email}
                               onChange={handleChangeEmail}
                               required={true}
                               name="email"
                               autoComplete="off"
                               placeholder="Enter your email"
                               type="text"/>
                    </div>
                    <div className={styles.sign_in__id}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input value={password}
                               onChange={handleChangePassword}
                               required={true}
                               name="password"
                               autoComplete="off"
                               placeholder="Enter your password"
                               type="text"/>
                    </div>
                    <p><Link to="/sign-up">Not registered yet?</Link></p>
                    <button>Войти</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;