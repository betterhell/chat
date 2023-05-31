import React from 'react'
import './App.scss'
import {Route, Routes} from "react-router-dom";

import SignIn from "./components/SignIn/SignIn";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import SignUp from "./components/SignUp/SignUp";


const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/chat" element={<Chat/>}/>
            </Routes>
        </div>
    )
}

export default App
