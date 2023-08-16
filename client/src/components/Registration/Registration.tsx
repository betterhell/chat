import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import {useUserStore} from "../../store/user.store";
import DotsIcon from "../../assets/icons/DotsIcon/DotsIcon";
import Error from "../Error/Error";
import Loader from "../../assets/icons/Loader";

const Registration = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {registration, isLoading, isError, isAuth} = useUserStore()

    useEffect(() => {
        if (isAuth) {
            navigate("/chat")
        }
    })

    if (isLoading) {
        return <div className="loading_screen">
            <Loader width="200" height="200" color="white"/>
        </div>
    }

    const registrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await registration(username, email, password)
        isAuth && navigate("/chat")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.sign_up}>
                <form onSubmit={registrationSubmit}>
                    <h1>Sign Up</h1>
                    <div className={styles.sign_up__id}>
                        <label htmlFor="username">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={true}
                            autoComplete="off"
                            placeholder="Enter your username"
                            name="username"
                            type="text"/>
                    </div>
                    <div className={styles.sign_up__id}>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                            autoComplete="off"
                            placeholder="Enter your password"
                            name="password"
                            type="password"/>
                    </div>
                    <Error/>
                    <p><Link to="/login">Registered yet?</Link></p>
                    <button>Register</button>
                </form>
            </div>
        </div>
    )
};

export default Registration;