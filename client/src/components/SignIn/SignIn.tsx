import React, {useState} from 'react';
import styles from "./styles.module.scss"
import {useUserStore} from "../../store/user.store";
import Spinner from "../../UI/Spinner/Spinner";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value)
    }

    const setNewUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/chat?username=${username}&room=${room}`)
    }

    return (
        <div className={styles.sign_in}>
            <form onSubmit={setNewUser}>
                <h1>Войти</h1>
                <div className={styles.sign_in__id}>
                    <label htmlFor="nickname">
                        Nickname
                    </label>
                    <input value={username}
                           onChange={handleUsernameChange}
                           required={true}
                           autoComplete="off"
                           placeholder="You'r fking nickname"
                           name="nickname"
                           type="text"/>
                </div>

                <div className={styles.sign_in__token}>
                    <label htmlFor="room">
                        Room
                    </label>
                    <input value={room}
                           onChange={handleRoomChange}
                           required={true}
                           autoComplete="off"
                           placeholder="You'r fking room"
                           name="room"
                           type="text"/>
                </div>
                {/*{!checker &&*/}
                {/*    <div className={styles.sign_in__warning}>*/}
                {/*        <p className={styles.sign_in__warning__notAuth} style={{color: "red"}}>Пользователь на*/}
                {/*            авторизован.*/}
                {/*        </p>*/}
                {/*        <p className={styles.sign_in__warning__forAuth}> Для авторизации аккаунта обратитесь к*/}
                {/*            разделу <br/>*/}
                {/*            <a target="_blank" href="https://green-api.com/docs/before-start/#qr"> Перед началом*/}
                {/*                работы*/}
                {/*            </a>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*}*/}
                <button>Войти</button>
            </form>
        </div>
    );
};

export default SignIn;