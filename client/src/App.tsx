import React, {useEffect} from 'react'
import './App.scss'
import {Route, Routes} from "react-router-dom";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import Registration from "./components/Registration/Registration";

import {useUserStore} from "./store/user.store";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import {useChatStore} from "./store/chat.store";
import socket from "./socket";
import {User} from "./models/user.model";

socket.on("user:responseNewUserList", (data: User[]) => {
    console.log(new Date())
    useUserStore.getState().updateUsers(data)
})

const App = () => {
    const {checkAuth, isAuth} = useUserStore()
    const {socketSubscribe} = useChatStore()

    useEffect(() => {
        socketSubscribe()

        if (localStorage.getItem("token")) {
            checkAuth()
        }
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route element={<PrivateRoute isAuth={isAuth}/>}>
                    <Route path="/chat" element={<Chat/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
