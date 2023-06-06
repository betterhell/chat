import React, {useEffect} from 'react'
import './App.scss'
import {Route, Routes} from "react-router-dom";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import Registration from "./components/Registration/Registration";
import Loader from "./assets/icons/Loader/Loader";

import {useUserStore} from "./store/user.store";


const App = () => {
    const {checkAuth, isAuth, isLoading} = useUserStore()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuth()
        }
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                {isAuth ? <Route path="/chat" element={<Chat/>}/> : <Route path="/login" element={<Login/>}/>}
            </Routes>
        </div>
    )
}

export default App
