import React, {useState} from 'react';
import styles from "./styles.module.scss"
import Spinner from "../../UI/Spinner/Spinner";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";

interface SignInProps {
    socket: any
}

const SignIn: React.FC<SignInProps> = ({socket}) => {
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.setItem("username", username)

        socket.emit('newUser', {
            username,
            id: uuidv4(),
        })
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
                    <input value={username}
                           onChange={handleUsernameChange}
                           required={true}
                           autoComplete="off"
                           placeholder="You'r fking nickname"
                           name="nickname"
                           type="text"/>
                </div>

                {/*<div className={styles.sign_in__token}>*/}
                {/*    <label htmlFor="room">*/}
                {/*        Room*/}
                {/*    </label>*/}
                {/*    <input value={room}*/}
                {/*           onChange={handleRoomChange}*/}
                {/*           required={true}*/}
                {/*           autoComplete="off"*/}
                {/*           placeholder="You'r fking room"*/}
                {/*           name="room"*/}
                {/*           type="text"/>*/}
                {/*</div>*/}
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