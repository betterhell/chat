import React, {useState} from 'react';
import styles from "./styles.module.scss"
import {useUserStore} from "../../store/user.store";
import Spinner from "../../UI/Spinner/Spinner";

const SignIn = () => {
    const [id, setId] = useState("")
    const [token, setToken] = useState("")

    const setUserId = useUserStore(state => state.setUserId)
    const setUserToken = useUserStore(state => state.setUserToken)
    const userStatus = useUserStore(state => state.userStatus)
    const isLoading = useUserStore(state => state.isLoading)
    const checkUser = useUserStore(state => state.checkUser)

    const setUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
    }

    const setUserTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value)
    }

    const setNewUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUserId(id)
        setUserToken(token)
        setId("")
        setToken("")
        checkUser()
    }

    return (
        <div className={styles.sign_in}>
            <form onSubmit={setNewUser}>
                <h1>Войти</h1>
                <div className={styles.sign_in__id}>
                    <label htmlFor="id">
                        idInstance
                    </label>
                    <input value={id} onChange={setUserIdChange}
                           required={true}
                           placeholder="Введите id"
                           name="id"
                           type="text"/>
                </div>

                <div className={styles.sign_in__token}>
                    <label htmlFor="token">
                        apiTokenInstance
                    </label>
                    <input value={token} onChange={setUserTokenChange}
                           required={true}
                           placeholder="Введите токен"
                           name="token"
                           type="text"/>
                </div>
                {userStatus !== 200 &&
                    <div className={styles.sign_in__warning}>
                        <p className={styles.sign_in__warning__notAuth} style={{color: "red"}}>Пользователь на
                            авторизован.
                        </p>
                        <p className={styles.sign_in__warning__forAuth}> Для авторизации аккаунта обратитесь к
                            разделу <br/>
                            <a target="_blank" href="https://green-api.com/docs/before-start/#qr"> Перед началом
                                работы
                            </a>
                        </p>
                    </div>
                }
                {isLoading ? <Spinner/> : <button>Войти</button>}
            </form>
        </div>
    );
};

export default SignIn;