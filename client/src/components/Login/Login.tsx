import React, {useState} from 'react';
import styles from "./styles.module.scss"

import {Link, useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/user.store";

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {login} = useUserStore()

    const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(email, password)
        navigate("/chat")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.sign_in}>
                <form onSubmit={loginSubmit}>
                    <h1>Sign In</h1>
                    <div className={styles.sign_in__id}>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input value={email}
                               onChange={(e) => setEmail(e.target.value)}
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
                               onChange={(e) => setPassword(e.target.value)}
                               required={true}
                               name="password"
                               autoComplete="off"
                               placeholder="Enter your password"
                               type="text"/>
                    </div>
                    <p><Link to="/registration">Not registered yet?</Link></p>
                    <button>Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login;