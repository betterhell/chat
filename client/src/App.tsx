import React, {useEffect} from 'react'
import './App.scss'
import {Route, Routes} from "react-router-dom";
import {io} from "socket.io-client"

const socket = io("http://localhost:5000")

import SignIn from "./components/SignIn/SignIn";
import Chat from "./components/Chat/Chat";

const App = () => {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<SignIn socket={socket}/>}/>
                <Route path="/chat" element={<Chat socket={socket}/>}/>
            </Routes>
        </div>
    )
}

export default App
