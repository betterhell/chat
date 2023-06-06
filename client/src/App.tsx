import React from 'react'
import './App.scss'
import {Route, Routes} from "react-router-dom";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import Registration from "./components/Registration/Registration";


const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/chat" element={<Chat/>}/>
            </Routes>
        </div>
    )
}

export default App
