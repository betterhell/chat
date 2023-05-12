import React, {useState} from 'react';
import styles from "./styles.module.scss"
import {useUserStore} from "../../store/user.store";
import Spinner from "../../UI/Spinner/Spinner";

const SignIn = () => {
    const [userId, setUserId] = useState("")
    const [userToken, setUserToken] = useState("")

    const setUserIdStore = useUserStore(state => state.setUserId)
    const setUserTokenStore = useUserStore(state => state.setUserToken)
    const userStatus = useUserStore(state => state.userStatus)
    const isLoading = useUserStore(state => state.isLoading)
    const checkUser = useUserStore(state => state.checkUser)

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value)
    }

    const handleUserTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserToken(e.target.value)
    }


    const handleNewUserId = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUserIdStore(userId)
        setUserTokenStore(userToken)
        setUserId("")
        setUserToken("")
        checkUser()
    }

    return (
        <div className={styles.sign_in}>
            <form onSubmit={handleNewUserId}>
                <h1>Войти</h1>
                <div className={styles.sign_in__id}>
                    <label htmlFor="id">
                        idInstance
                    </label>
                    <input value={userId} onChange={handleUserIdChange}
                           required={true}
                           placeholder="Введите id"
                           name="id"
                           type="text"/>
                </div>

                <div className={styles.sign_in__token}>
                    <label htmlFor="token">
                        apiTokenInstance
                    </label>
                    <input value={userToken} onChange={handleUserTokenChange}
                           required={true}
                           placeholder="Введите токен"
                           name="token"
                           type="text"/>
                </div>
                {userStatus !== 200 &&
                    <p style={{color: "red"}}>Пользователь на авторизован.
                        Для авторизации аккаунта обратитесь к разделу
                        <a target="_blank" href="https://green-api.com/docs/before-start/#qr">Перед началом работы</a>
                    </p>
                }
                {isLoading ? <Spinner/> : <button>Войти</button>}
            </form>
        </div>
    );
};

export default SignIn;