import React, {useState} from 'react'
import './App.scss'
import MainPage from "./pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import Chat from "./components/Chat/Chat";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
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
