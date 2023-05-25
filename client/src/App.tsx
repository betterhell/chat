import React from 'react'
import './App.scss'
import {Route, Routes} from "react-router-dom";

import SignIn from "./components/SignIn/SignIn";
import Chat from "./components/Chat/Chat";


const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/chat" element={<Chat/>}/>
            </Routes>
        </div>
    )
}

export default App
